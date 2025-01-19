import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  BsBookmarkCheck,
  BsCalendar2EventFill,
  BsCameraReels,
  BsCameraReelsFill,
  BsCameraVideoFill,
  BsEmojiSmileFill,
  BsEnvelope,
  BsFileEarmarkText,
  BsGeoAltFill,
  BsImageFill,
  BsImages,
  BsPencilSquare,
  BsTagFill,
  BsThreeDots,
} from 'react-icons/bs'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useToggle from '@/hooks/useToggle'
import DropzoneFormInput from '../form/DropzoneFormInput'
import TextFormInput from '../form/TextFormInput'
import TextAreaFormInput from '../form/TextAreaFormInput'
import DateFormInput from '../form/DateFormInput'
import avatar1 from '@/assets/images/avatar/01.jpg'
import avatar2 from '@/assets/images/avatar/02.jpg'
import avatar3 from '@/assets/images/avatar/03.jpg'
import avatar4 from '@/assets/images/avatar/04.jpg'
import avatar5 from '@/assets/images/avatar/05.jpg'
import avatar6 from '@/assets/images/avatar/06.jpg'
import avatar7 from '@/assets/images/avatar/default avatar.png'
import ChoicesFormInput from '../form/ChoicesFormInput'
import { Link } from 'react-router-dom'
import { SendHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'
import { CREATE_POST } from '@/utils/api'
import { FileUpload, uploadDoc, uploadMulti } from '@/utils/CustomS3ImageUpload'
import { FileType } from '@/hooks/useFileUploader'
const skeletonBaseColor = '#e3e3e3'
const skeletonHighlightColor = '#f2f2f2'

interface CreatePostCardProps {
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
}
import { useAuthContext } from '@/context/useAuthContext'
import UserModel from './UserModel'

interface ApiResponse<T> {
  status: number
  data: T
}

const CreatePostCard = ({ setIsCreated }: CreatePostCardProps) => {
  const guests = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7]
  const { isTrue: isOpenPhoto, toggle: togglePhotoModel } = useToggle()
  const { isTrue: isOpenVideo, toggle: toggleVideoModel } = useToggle()
  const { isTrue: isOpenEvent, toggle: toggleEvent } = useToggle()
  const [modelTime, setModelTime] = useState(false)
  const { user } = useAuthContext()

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

  const [thoughts, setThoughts] = useState('');
  const [photoQuote, setPhotoQuote] = useState('');
  const [videoQuote, setVideoQuote] = useState('');
  const [awsIds, setAwsIds] = useState<any>([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  // const {user} = useAuthContext();
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (modelTime) {
      return
    }
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      setSkeletonLoading(true)
      const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/auth/get-user-Profile', {
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

  const handlePostClick = async (values: string) => {
    // Check if thoughts is empty
    if (!thoughts.trim()) {
      console.log('Thoughts cannot be empty.')
      return
    }

    try {
      // Regular expression to match hashtags
      const hashtagRegex = /#\w+/g
      const hashtags = thoughts.match(hashtagRegex) || []
      console.log('------user--------', user, user?.id)
      const response = await makeApiRequest<ApiResponse<{ url: string }>>({
        method: 'POST',
        url: CREATE_POST,
        data: {
          userId: user?.id,
          content: thoughts,
          hashtags: hashtags,
        },
      })

      if (response.data) {
        setThoughts('') // Clear thoughts after successful post
        setIsCreated(true) // Trigger the state update in the parent component
      }
    } catch (err) {
      console.log('Error in the posting', err)
    }
  }

  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])

  // This function will be triggered when files are uploaded
  const handleFileUpload = (files: FileUpload[]) => {
    console.log('---In handleFileUpload---uploadedFiles----', uploadedFiles)
    console.log('-----files in params----', files)
    setUploadedFiles([...uploadedFiles, ...files])
    console.log('---setted files---in my function', files)
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
    const uploadSuccess = await handleUpload()

    try {
      // Wait for handleUpload to complete before proceeding

      if (uploadSuccess) {
        // Regular expression to match hashtags
        const hashtagRegex = /#\w+/g
        const hashtags = photoQuote.match(hashtagRegex) || []

        console.log('-------------awsIds----------------------------- :', awsIds)
        // Making the API request
        const response = await makeApiRequest<ApiResponse<{ url: string }>>({
          method: 'POST',
          url: CREATE_POST,
          data: {
            userId: user?.id,
            content: photoQuote,
            hashtags: hashtags,
            mediaKeys: uploadSuccess,
          },
        })
        if (response.data) {
          console.log('went inside')
          setThoughts('') // Reset thoughts after successful post
          togglePhotoModel()
          setTimeout(() => {
            setIsCreated(true)
          }, 1000)
        }
      } else {
        console.log('Upload failed. Post not submitted.')
      }
    } catch (err) {
      console.log('Error in the posting', err)
    }
  }

  const handleVideoSubmit = async () => {
    try {
      // Wait for handleUpload to complete before proceeding
      const uploadSuccess = await handleUpload()
      console.log('video upload success', uploadSuccess)

      if (uploadSuccess) {
        // Regular expression to match hashtags
        const hashtagRegex = /#\w+/g
        const hashtags = videoQuote.match(hashtagRegex) || []
        console.log('hashtags match', hashtags)
        console.log('---videoupload----', videoQuote)
        console.log('---upload success---', uploadSuccess)
        // Making the API request
        const data = {
          userId: user?.id,
          content: videoQuote,
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
          toggleVideoModel()
          setTimeout(() => {
            setIsCreated(true)
          }, 1000)
        }
      } else {
        console.log('Upload failed. Post not submitted.')
      }
    } catch (err) {
      console.log('Error in the posting', err)
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

  return (
    <>
      {/* {show && modelTime &&
        <div className="modal-body w-100 " >
          <div className="modal fade show d-block " style={{ backgroundColor: "#000000ab" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header d-flex row">
                  <h5 className="modal-title w-50" id="exampleModalLongTitle">Complete your profile</h5>
                  <button type="button" className="close border-0 w-25 text-info justify-content-around" onClick={handleClose} aria-label="Close">
                    skip
                  </button>
                </div>
                <UserModel />

              </div>
            </div>
          </div>
        </div>} */}

      <Card className="card-body">
        <div className="d-flex mb-3">
          <Link to={`/profile/feed/${user?.id}`}>
            <div className="avatar avatar-xs me-2">
              <span role="button">
                {skeletonLoading ? (
                  <Skeleton height={40} width={40}  className='rounded-circle' baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor}/>
                ) : (
                  <img className="avatar-img rounded-circle" src={profile.profileImgUrl ? profile.profileImgUrl : avatar7} alt="avatar3" />
                )}
              </span>
            </div>
          </Link>

          <form
            className="w-100"
            onSubmit={handleSubmit((values) => {
              console.log('---- create event ----', values)
              // console.log('Post button clicked')
            })}>
            <textarea
            
              className="form-control pe-4 border-0"
              rows={2}
              data-autoresize
              placeholder="Share your thoughts..."
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)} // Update state with input value
              
            />
          </form>
        </div>

        <ul className="nav nav-pills nav-stack small fw-normal">
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={togglePhotoModel}>
              <BsImageFill size={20} className="text-success pe-2" />
              Photo
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={toggleVideoModel}>
              <BsCameraReelsFill size={20} className="text-info pe-2" />
              Video
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={toggleEvent}>
              <BsCalendar2EventFill size={20} className="text-danger pe-2" />
              Event
            </a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link bg-light py-1 px-2 mb-0" onClick={handlePostClick}>
              <SendHorizontal size={14} color="#2f09ec" style={{ marginRight: '3px' }} />
              {'   Post'}
            </a>
          </li>
          {/* <Dropdown drop="start" className="nav-item ms-lg-auto">
            <DropdownToggle
              as="a"
              className="nav-link bg-light py-1 px-2 mb-0 content-none"
              id="feedActionShare"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <BsThreeDots />
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-end" aria-labelledby="feedActionShare">
              <li>
                <DropdownItem>
                  <BsEnvelope size={21} className="fa-fw pe-2" />
                  Create a poll
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsBookmarkCheck size={21} className="fa-fw pe-2" />
                  Ask a question
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  <BsPencilSquare size={21} className="fa-fw pe-2" />
                  Help
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown> */}
        </ul>
      </Card>

      {/* photo */}
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
              <img className="avatar-img rounded-circle" src={avatar3} alt="" />
            </div>
            <form className="w-100">
              <textarea
                className="form-control pe-4 fs-3 lh-1 border-0"
                rows={2}
                onChange={(e) => setPhotoQuote(e.target.value)}
                placeholder="Share your thoughts..."
                value={photoQuote} // Only use value for controlled input
                
              />
            </form>
          </div>
          <div>
            <label className="form-label">Upload attachment</label>
            <DropzoneFormInput icon={BsImages} onFileUpload={handleFileUpload} showPreview text="Drag here or click to upload photo." />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal" onClick={() => togglePhotoModel()}>
            Cancel
          </button>
          <button type="submit" onClick={handlePhotoSubmit} className="btn btn-success-soft">
            Post
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
              <img className="avatar-img rounded-circle" src={avatar3} alt="" />
            </div>
            <form className="w-100">
              <textarea
                onChange={(e) => setVideoQuote(e.target.value)}
                value={videoQuote}
                className="form-control pe-4 fs-3 lh-1 border-0"
                rows={2}
                placeholder="Share your thoughts..."
                defaultValue={''}
              />
            </form>
          </div>
          <div>
            <DropzoneFormInput
              label="Upload attachment"
              onFileUpload={handleFileUpload}
              icon={BsCameraReels}
              showPreview
              text="Drag here or click to upload video."
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger-soft" type="button" className="me-2">
            <BsCameraVideoFill className="pe-1" /> Live video
          </Button>
          <button type="submit" onClick={handleVideoSubmit} className="btn btn-success-soft">
            Post
          </button>
        </ModalFooter>
      </Modal>

      {/* event */}
      <Modal
        show={isOpenEvent}
        onHide={toggleEvent}
        centered
        className="fade"
        id="modalCreateEvents"
        tabIndex={-1}
        aria-labelledby="modalLabelCreateEvents"
        aria-hidden="true">
        <form
          onSubmit={handleSubmit((values) => {
            console.log('---- create event ----', values)
            console.log('Post button clicked')
          })}>
          <ModalHeader closeButton>
            <h5 className="modal-title" id="modalLabelCreateEvents">
              Create event
            </h5>
          </ModalHeader>
          <ModalBody>
            <Row className="g-4">
              <TextFormInput name="title" label="Title" placeholder="Event name here" containerClassName="col-12" control={control} />
              <TextAreaFormInput
                name="description"
                label="Description"
                rows={2}
                placeholder="Ex: topics, schedule, etc."
                containerClassName="col-12"
                control={control}
              />

              <Col sm={4}>
                <label className="form-label">Date</label>
                <DateFormInput options={{ enableTime: false }} type="text" className="form-control" placeholder="Select date" />
              </Col>
              <Col sm={4}>
                <label className="form-label">Time</label>
                <DateFormInput options={{ enableTime: true, noCalendar: true }} type="text" className="form-control" placeholder="Select time" />
              </Col>
              <TextFormInput name="duration" label="Duration" placeholder="1hr 23m" containerClassName="col-sm-4" control={control} />
              <TextFormInput name="location" label="Location" placeholder="Logansport, IN 46947" containerClassName="col-12" control={control} />
              <TextFormInput name="guest" type="email" label="Add guests" placeholder="Guest email" containerClassName="col-12" control={control} />
              <Col xs={12} className="mt-3">
                <ul className="avatar-group list-unstyled align-items-center mb-0">
                  {guests.map((avatar, idx) => (
                    <li className="avatar avatar-xs" key={idx}>
                      <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
                    </li>
                  ))}
                  <li className="ms-3">
                    <small> +50 </small>
                  </li>
                </ul>
              </Col>
              <div className="mb-3">
                <DropzoneFormInput
                  showPreview
                  helpText="Drop presentation and document here or click to upload."
                  icon={BsFileEarmarkText}
                  label="Upload attachment"
                />
              </div>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger-soft" type="button" className="me-2" onClick={toggleEvent}>
              Cancel
            </Button>
            <Button variant="success-soft" type="submit">
              Create now
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export default CreatePostCard
