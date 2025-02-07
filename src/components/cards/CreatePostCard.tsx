import {
  Button,
  Card,
  Col,
  Image,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import 'react-loading-skeleton/dist/skeleton.css'
import {
  BsCalendar2EventFill,
  BsCameraReels,
  BsCameraReelsFill,
  BsCameraVideoFill,
  BsEmojiSmileFill,
  BsGeoAltFill,
  BsImageFill,
  BsImages,
  BsTagFill,
} from 'react-icons/bs'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useToggle from '@/hooks/useToggle'
import DropzoneFormInput from '../form/DropzoneFormInput'
import avatar7 from '@/assets/images/avatar/default avatar.png'
import ChoicesFormInput from '../form/ChoicesFormInput'
import { Link } from 'react-router-dom'
import { SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'
import { CREATE_POST } from '@/utils/api'
import { FileUpload, uploadMulti } from '@/utils/CustomS3ImageUpload'

interface CreatePostCardProps {
  isCreated: boolean,
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
}
import { useAuthContext } from '@/context/useAuthContext'
import { Spinner } from "react-bootstrap";
import { UserProfile } from '@/app/(social)/feed/(container)/home/page'
interface ApiResponse<T> {
  status: number
  data: T
}

const CreatePostCard = ({ setIsCreated, isCreated }: CreatePostCardProps) => {
  const { isTrue: isOpenPhoto, toggle: togglePhotoModel } = useToggle()
  const { isTrue: isOpenVideo, toggle: toggleVideoModel } = useToggle()
  const [modelTime, setModelTime] = useState(false)
  const { user } = useAuthContext();
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [isSubmittingPhoto, setIsSubmittingPhoto] = useState(false);
  const [isSubmittingVideo, setIsSubmittingVideo] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventFormSchema = yup.object({
    title: yup.string().required('Please enter event title'),
    description: yup.string().required('Please enter event description'),
    duration: yup.string().required('Please enter event duration'),
    location: yup.string().required('Please enter event location'),
    guest: yup.string().email('Please enter valid email').required('Please enter event guest email'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(eventFormSchema),
  })

  const [thoughts, setThoughts] = useState('')
  const [photoQuote, setPhotoQuote] = useState('')
  const [videoQuote, setVideoQuote] = useState('')
  const [awsIds, setAwsIds] = useState<any>([])
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const { isTrue: isOpenPost, toggle: togglePost } = useToggle()
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])
  const [profile, setProfile] = useState<UserProfile>({})

  useEffect(() => {
    if (modelTime) {
      return
    }
    fetchUser()
  }, [])



  const fetchUser = async () => {
    try {
      setSkeletonLoading(true)
      const response = await fetch('http://13.216.146.100/api/v1/auth/get-user-Profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // console.log('data', data)
      setSkeletonLoading(false)
      setProfile(data.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setSkeletonLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
    return date.toLocaleString('en-GB', options).replace(',', ' at')
  }

  

  // This function will be triggered when files are uploaded
  const handleFileUpload = (files: FileUpload[]) => {
    setUploadedFiles([...files])
  }

  // console.log('---- photo uploading -----', uploadedFiles)

  const handleUpload = async () => {
    try {
      const response = await uploadMulti(uploadedFiles, user?.id) // Await the uploadDoc promise
      console.log('---- response in the upload doc function ----', response)
      return response
    } catch (err) {
      console.error('Error in the createpostcard:', err)
      return false // Indicate failure
    }
  }

  const handlePhotoSubmit = async () => {
    if (uploadedFiles.length === 0) {
      alert('No Photos are Uploaded');
      return;
    }
    setIsSubmittingPhoto(true);
    const uploadSuccess = await handleUpload()


    try {
      // Wait for handleUpload to complete before proceeding

      if (uploadSuccess) {
        // Regular expression to match hashtags
        const hashtagRegex = /#\w+/g
        const hashtags = photoQuote.match(hashtagRegex) || []

        // console.log('-------------awsIds----------------------------- :', awsIds)
        // Making the API request
        const response = await makeApiRequest<ApiResponse<{ url: string }>>({
          method: 'POST',
          url: CREATE_POST,
          data: {
            userId: user?.id,
            content: thoughts,
            hashtags: hashtags,
            mediaKeys: uploadSuccess,
          },
        })
        if (response.data) {
          console.log('went inside')
          setThoughts('') // Reset thoughts after successful post
          togglePhotoModel()
        }
      } else {
        console.log('Upload failed. Post not submitted.')
      }
    } catch (err) {
      console.log('Error in the posting', err)
    }
    finally {
      setIsCreated(() => !isCreated)
      setIsSubmittingPhoto(false);
      setUploadedFiles([]);
      setThoughts('');
    }
  }

  const handleVideoSubmit = async () => {
    if (uploadedFiles.length === 0) {
      alert('You must add a Video');
      return;
    }
    setIsSubmittingVideo(true);
    try {
      // Wait for handleUpload to complete before proceeding
      const uploadSuccess = await handleUpload()
      // console.log('video upload success', uploadSuccess)

      if (uploadSuccess) {
        // Regular expression to match hashtags
        const hashtagRegex = /#\w+/g
        const hashtags = videoQuote.match(hashtagRegex) || []
        // console.log('hashtags match', hashtags)
        // console.log('---videoupload----', videoQuote)
        // console.log('---upload success---', uploadSuccess)
        // Making the API request
        const data = {
          userId: user?.id,
          content: thoughts,
          hashtags: hashtags,
          mediaKeys: uploadSuccess || [],
        }
        console.log('video request data', data)
        const response = await makeApiRequest<ApiResponse<{ url: string }>>({
          method: 'POST',
          url: CREATE_POST,
          data: data,
        })

        if (response.data) {
          setThoughts('') // Reset thoughts after successful post

          console.log('isCreated before', isCreated)

          console.log('isCreated after', isCreated)
        }
      } else {
        console.log('Upload failed. Post not submitted.')
      }
    } catch (err) {
      console.log('Error in the posting', err)
    }
    finally {
      setIsSubmittingVideo(false);
      toggleVideoModel();
      setUploadedFiles([]);
      setThoughts('');
      setIsCreated(() => !isCreated)
    }
  }
  // console.log("profile", profile);

  const [show, setShow] = useState(true)
  const handleClose = () => {
    setShow(false)
    setModelTime(false)
  }

  const handleShow = () => setShow(true)

  setTimeout(() => {
    if (profile?.personalDetails?.profilePictureUploadId === null) {
      setTimeout(() => {
        setModelTime(true)
      }, 3000)
    }
    return
  }, 3000)


  const handlePostClick = async (values) => {
    // Check if thoughts is empty
    if (!thoughts.trim()) {
      console.log('Thoughts cannot be empty.')
      alert('Thoughts cannot be empty.')
      return
    }
    setIsSubmittingPost(true);
    try {
      const hashtagRegex = /#\w+/g
      const hashtags = thoughts.match(hashtagRegex) || []
      const response = await makeApiRequest<ApiResponse<{ url: string }>>({
        method: 'POST',
        url: CREATE_POST,
        data: {
          userId: user?.id,
          content: values,
          hashtags: hashtags,
        },
      })

      if (response.data) {
        setThoughts('')
        console.log('isCreated before', isCreated)
        setIsCreated(() => !isCreated)
        console.log('isCreated after', isCreated)
      }
    } catch (err) {
      console.log('Error in the posting', err)
    }
    finally {
      setIsSubmittingPost(false);
      setUploadedFiles([]);
    }
  }

  const [mentionDropdownVisible, setMentionDropdownVisible] = useState(false);
  const textareaRef = useRef(null);

  // Function to handle textarea change
  const handleChange = (e: any) => {
    const value = e.target.value;
    setThoughts(value);
    checkForMention(value);
  };

  // Function to handle photo quote change
  const handleChangePhotoQuote = (e: any) => {
    setThoughts(e.target.value);
    checkForMention(e.target.value);
  };

  // Function to handle video quote change
  const handleChangeVideoQuote = (e: any) => {
    setThoughts(e.target.value);
    checkForMention(e.target.value);
  };

  // Function to check if user is typing a mention
  const checkForMention = (text: string) => {
    const match = text.match(/@\S*$/);
    if (text.endsWith("@")) {
      fetchUsers("")
    }
    else if (match) {
      fetchUsers(match[0].slice(1));
    }
    else {
      setMentionDropdownVisible(false);
    }
  };

  // Function to fetch users when '@' is typed
  const fetchUsers = async (query: string) => {
    if (!query) return; 
    console.log('query', query);

    try {
      const response = await fetch("http://13.216.146.100/api/v1/post/mention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, query: query }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSearchResults(data?.data || []);
      setMentionDropdownVisible(data?.data.length > 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to insert mention correctly
  const handleMentionClick = (user: any, type: string) => {
    const mention = `@${user.userName} `;

    const updateText = (prev: string) => {
      return prev.replace(/@\S*$/, mention); 
    };

    if (type === "thoughts") {
      setThoughts(updateText);
    } else if (type === "photoQuote") {
      setPhotoQuote(updateText);
    } else if (type === "videoQuote") {
      setVideoQuote(updateText);
    }

    setMentionDropdownVisible(false);
  };


  return (
    <>
      <Card className="card-body" style={{ maxHeight: '10em' }}>
        <div className="d-flex mb-3">
          <Link to={`/profile/feed/${user?.id}`}>
            <div className="me-2" style={{ marginTop: "-25px" }}>
              <span role="button">
              <div
                    style={{
                      border : '3px solid white',
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginTop : '30px'
                    }}
                  >
                    <Image
                      src={profile.profileImgUrl || avatar7} // Replace with your actual image source
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: `scale(${(profile.personalDetails?.zoomProfile || 50)  / 50}) rotate(${(profile.personalDetails?.rotateProfile || 50) - 50}deg)`,
                      }}
                    />
                  </div>
              </span>
            </div>
          </Link>

          {/* Custom Mention Input */}
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              ref={textareaRef}
              className="form-control pe-4 border rounded"
              style={{
                borderColor: "#212529",
                color: "#212529",
                backgroundColor: "#f8f9fa",
                fontSize: "14px",
                width: "100%",
                resize: "none",
              }}
              rows={2}
              placeholder="Share your thoughts, Use @ to mention your connections and # to add topics or keywords"
              value={thoughts}
              onChange={handleChange}
            />

            {/* Mention Dropdown */}
            {mentionDropdownVisible && searchResults.length > 0 && (
              <div
                className="position-absolute bg-white shadow rounded w-100 mt-1"
                style={{
                  zIndex: 1000,
                  maxHeight: "10rem",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                }}
              >
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center p-2 cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMentionClick(user, "thoughts")}
                  >
                    <div className='avatar'>
                      <img
                        src={user.avatar ? user.avatar : avatar7}
                        alt={user.fullName}
                        className="avatar-img rounded-circle border border-white border-3"
                        width={34}
                        height={34}
                      />
                    </div>
                    <div>
                      <h6 className="mb-0">{user.fullName}</h6>
                      <small className="text-muted">{user.userRole}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ul className="nav nav-pills d-inline-flex small fw-normal justify-content-between flex-wrap">
          <li className="nav-item d-inline">
            <a className="nav-link bg-light py-2 px-4 mb-2" onClick={togglePhotoModel}>
              <BsImageFill size={20} className="text-success pe-2" />
              Photo
            </a>
          </li>
          <li className="nav-item d-inline">
            <a className="nav-link bg-light py-2 px-4 mb-2" onClick={toggleVideoModel}>
              <BsCameraReelsFill size={20} className="text-info pe-2" />
              Video
            </a>
          </li>
          <li className="nav-item d-inline">
            <a className="nav-link bg-light py-2 px-4 mb-2"
              onClick={() => handlePostClick(thoughts)}
            >
              {isSubmittingPost ? <Spinner size="sm" animation="border" /> : <> <SendHorizontal size={14} color="#2f09ec" style={{ marginRight: '3px' }} />
                <span style={{ marginLeft: '5px' }}>Post</span> </>}
            </a>
          </li>
        </ul>
      </Card>
      <Modal
        show={isOpenPhoto}
        onHide={togglePhotoModel}
        centered
        className="fade"
        id="feedActionPhoto"
        tabIndex={-1}
        aria-labelledby="feedActionPhotoLabel"
        aria-hidden="true">
        <ModalHeader closeButton>
          <h5 className="modal-title" id="feedActionPhotoLabel">
            Add post photo
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3 ">
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src={profile.profileImgUrl ? profile.profileImgUrl : avatar7} alt="" />
            </div>
            <form className="w-100">
              {/* <textarea
                className="form-control pe-4 fs-3 lh-1 border-0"
                rows={2}
                onChange={(e) => setPhotoQuote(e.target.value)}
                placeholder="Share your thoughts, Use @ to mention your connections and # to add topics or keywords"
                value={photoQuote} // Only use value for controlled input

                
              /> */}

              <div style={{ position: "relative", width: "100%" }}>
                <textarea
                  ref={textareaRef}
                  className="form-control pe-4 border rounded"
                  style={{
                    borderColor: "#212529",
                    color: "#212529",
                    backgroundColor: "#f8f9fa",
                    fontSize: "14px",
                    width: "100%",
                    resize: "none",
                  }}
                  rows={2}
                  placeholder="Share your thoughts, Use @ to mention your connections and # to add topics or keywords"
                  value={thoughts}
                  onChange={handleChangePhotoQuote}
                />

                {/* Mention Dropdown */}
                {mentionDropdownVisible && searchResults.length > 0 && (
                  <div
                    className="position-absolute bg-white shadow rounded w-100 mt-1"
                    style={{
                      zIndex: 1000,
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                    }}
                  >
                    {searchResults.map((user) => (
                      <div
                        key={user.id}
                        className="d-flex align-items-center p-2 cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleMentionClick(user, "photoQuote")}

                      >
                        <div className='avatar'>
                          <img
                            src={user.avatar ? user.avatar : avatar7}
                            alt={user.fullName}
                            className="avatar-img rounded-circle border border-white border-3"
                            width={3}
                            height={3}
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">{user.fullName}</h6>
                          <small className="text-muted">{user.userRole}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
          <div>
            <label className="form-label">Upload attachment</label>
            <DropzoneFormInput 
              icon={BsImages} 
              onFileUpload={handleFileUpload} 
              showPreview 
              text="Drag here or click to upload photo."
              uploadedFiles={uploadedFiles}
              setUploadedFiles={uploadedFiles}
              />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal" onClick={() => togglePhotoModel()}>
            Cancel
          </button>
          <button type="submit" onClick={handlePhotoSubmit} className="btn btn-success-soft">
            {isSubmittingPhoto ? <Spinner size="sm" animation="border" /> : "Post"}
          </button>
        </ModalFooter>
      </Modal>

      {/* video */}
      <Modal centered show={isOpenVideo} onHide={toggleVideoModel} className="fade" id="feedActionVideo" tabIndex={-1}>
        <ModalHeader closeButton>
          <h5 className="modal-title" id="feedActionVideoLabel">
            Add post video
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src={profile.profileImgUrl ? profile.profileImgUrl : avatar7} alt="" />
            </div>
            <form className="w-100">
              <textarea
                onChange={handleChangeVideoQuote}
                value={thoughts}
                className="form-control pe-4 fs-3 lh-1 border-0"
                rows={2}
                placeholder="Share your thoughts, Use @ to mention your connections and # to add topics or keywords"
                defaultValue={''}
              />

              {mentionDropdownVisible && searchResults.length > 0 && (
                <div
                  className="position-absolute bg-white shadow rounded w-100 mt-1"
                  style={{
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                  }}
                >
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="d-flex align-items-center p-2 cursor-pointer"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMentionClick(user, "videoQuote")}
                    >
                      <div className='avatar'>
                        <img
                          src={user.avatar ? user.avatar : avatar7}
                          alt={user.fullName}
                          className="avatar-img rounded-circle border border-white border-3"
                          width={34}
                          height={34}
                        />
                      </div>
                      <div>
                        <h6 className="mb-0">{user.fullName}</h6>
                        <small className="text-muted">{user.userRole}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </form>
          </div>
          <div>
            <DropzoneFormInput
              label="Upload attachment"
              onFileUpload={handleFileUpload}
              icon={BsCameraReels}
              showPreview
              text="Drag here or click to upload video."
              uploadedFiles={uploadedFiles}
              setUploadedFiles={uploadedFiles}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger-soft" type="button" className="me-2">
            <BsCameraVideoFill className="pe-1" /> Live video
          </Button>
          <button type="submit" onClick={handleVideoSubmit} className="btn btn-success-soft">
            {isSubmittingVideo ? <Spinner size="sm" animation="border" /> : "Post"}
          </button>
        </ModalFooter>
      </Modal>

      <Modal show={isOpenPost} onHide={togglePost} className="fade" centered id="modalCreateFeed" tabIndex={-1}>
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateFeed">
            Create post
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src={profile.profileImgUrl ? profile.profileImgUrl : avatar7} alt="" />
            </div>
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={4} placeholder="Share your thoughts, Use @ to mention your connections and # to add topics or keywords" defaultValue={''} />
              {mentionDropdownVisible && searchResults.length > 0 && (
                <div
                  className="position-absolute bg-white shadow rounded w-100 mt-1"
                  style={{
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                  }}
                >
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="d-flex align-items-center p-2 cursor-pointer"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMentionClick(user)}
                    >
                      <div className='avatar'>
                        <img
                          src={user.avatar ? user.avatar : avatar7}
                          alt={user.fullName}
                          className="avatar-img rounded-circle border border-white border-3"
                          width={34}
                          height={34}
                        />
                      </div>
                      <div>
                        <h6 className="mb-0">{user.fullName}</h6>
                        <small className="text-muted">{user.userRole}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          <div className="hstack gap-2">
            <OverlayTrigger overlay={<Tooltip>Photo</Tooltip>}>
              <Link className="icon-md bg-success bg-opacity-10 text-success rounded-circle" to="">

                <BsImageFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Video</Tooltip>}>
              <Link className="icon-md bg-info bg-opacity-10 text-info rounded-circle" to="">

                <BsCameraReelsFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Events</Tooltip>}>
              <Link className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle" to="">

                <BsCalendar2EventFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Feeling/Activity</Tooltip>}>
              <Link className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle" to="">

                <BsEmojiSmileFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Check in</Tooltip>}>
              <Link className="icon-md bg-light text-secondary rounded-circle" to="">

                <BsGeoAltFill />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Tag people on top</Tooltip>}>
              <Link className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle" to="">

                <BsTagFill />
              </Link>
            </OverlayTrigger>
          </div>
        </ModalBody>
        <ModalFooter className="row justify-content-between">
          <Col lg={3}>
            <ChoicesFormInput
              options={{ searchEnabled: false }}
              className="form-select js-choice choice-select-text-none"
              data-position="top"
              data-search-enabled="false">
              <option value="PB">Public</option>
              <option value="PV">Friends</option>
              <option value="PV">Only me</option>
              <option value="PV">Custom</option>
            </ChoicesFormInput>
          </Col>
          <Col lg={8} className="text-sm-end">
            <Button variant="danger-soft" type="button" className="me-2">

              <BsCameraVideoFill className="pe-1" /> Live video
            </Button>
            <Button variant="success-soft" type="button">
              Post
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default CreatePostCard
