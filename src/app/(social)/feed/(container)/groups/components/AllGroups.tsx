
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import { getAllGroups } from '@/helpers/data'
import { useFetchData } from '@/hooks/useFetchData'
import useToggle from '@/hooks/useToggle'
import type { GroupType } from '@/types/data'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContainer,
  TabContent,
  TabPane,
} from 'react-bootstrap'
import { BsGlobe, BsLock, BsPeople } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import placeholderImg from '@/assets/images/avatar/placeholder.jpg'
import { FaPencil } from 'react-icons/fa6'

const GroupCard = ({ group }: { group: GroupType }) => {



  
  const { image, logo, memberCount, members ,name, ppd, type, isJoin } = group
  return (
    <Card>
      <div
        className="h-80px rounded-top"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      />
      <div className="card-body text-center pt-0">
        <div className="avatar avatar-lg mt-n5 mb-3">
          <Link to="/feed/groups/details">
            <img className="avatar-img rounded-circle border border-white border-3 bg-white" src={logo} alt="group" />
          </Link>
        </div>
        <h5 className="mb-0">
          
          <Link to="/feed/groups/details">{name}</Link>
        </h5>
        <small className="icons-center gap-1">
          {type === 'Private' ? <BsLock size={17} className="pe-1" /> : <BsGlobe size={18} className="pe-1" />} {type} 
        </small>
        <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
          <div>
            <h6 className="mb-0">{memberCount}</h6>
            <small>TTM Revenue</small>
          </div>
          <div className="vr" />
          <div>
            <h6 className="mb-0">{ppd}</h6>
            <small>Asking Price</small>
          </div>
        </div>
        <ul className="avatar-group list-unstyled align-items-center justify-content-center mb-0 mt-3">
          {members.map((avatar, idx) => (
            <li className="avatar avatar-xs" key={idx}>
              <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
            </li>
          ))}

            
          
{/*}
      
          /<li className="avatar avatar-xs">
            <div className="avatar-img rounded-circle bg-primary">
              <span className="smaller text-white position-absolute top-50 start-50 translate-middle">+{Math.floor(Math.random() * 30)}</span>
            </div>
          </li>
*/}
        </ul>
        <Button>connect</Button>
      </div>

    
      <CardFooter className="text-center">
        {/*<Button variant={isJoin ? 'danger-soft' : 'success-soft'} size="sm">
          {isJoin ? 'Leave' : 'Join'} 
        </Button>
        */}  

<p>{group.desc} </p>

      </CardFooter>
    </Card>
  )
}

const AllGroups = () => {
  const { isTrue: isOpen, toggle } = useToggle()
  const allGroups = useFetchData(getAllGroups)

  const GroupNotFound = () => {
    return (
      <div className="my-sm-5 py-sm-5 text-center">
        <BsPeople className="display-1 text-body-secondary"> </BsPeople>
        <h4 className="mt-2 mb-3 text-body">No group founds</h4>
        <Button variant="primary-soft" size="sm" onClick={toggle}>
          
          Click here to add
        </Button>
      </div>
    )
  }
  return (
    <>
      <CardBody>
        <Card>
        <CardHeader className="border-0 pb-0">
            <Row className="g-4 align-items-center">
              <Col xs={12} lg={6}>
                <h1 className="h3 card-title mb-0">Market Place</h1>
              </Col>
              <Col xs={12} lg={4} className="ms-lg-auto">
                <div className="d-flex flex-column">
                  <label className="form-label mb-2">Sort by Categories</label>
                  <ChoicesFormInput
                    options={{ searchEnabled: false }}
                    className="form-select js-choice choice-select-text-none"
                    data-search-enabled="false">
                    <option value="saas">Saas</option>
                    <option value="content">Content</option>
                    <option value="shopify">Shopify App</option>
                    <option value="mainstreet">Main Street</option>
                    <option value="ecommerce">Ecommerce</option>
                    <option value="mobile">Mobile App</option>
                    <option value="other">Other</option>
                  </ChoicesFormInput>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <TabContainer defaultActiveKey="tab-1">
              <Nav className="nav-tabs nav-bottom-line justify-content-center justify-content-md-start">
                <NavItem>
                  
                  <NavLink eventKey="tab-1"> Market Place </NavLink>
                </NavItem>
                   {/*
                <NavItem>
               
                  <NavLink eventKey="tab-2"> Suggested for you </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="tab-3"> Popular near you </NavLink>
                </NavItem>
                <NavItem>
                  
                  <NavLink eventKey="tab-4"> More suggestions </NavLink>
                </NavItem>
                  */}
              </Nav>
              <TabContent className="mb-0 pb-0">
                <TabPane eventKey="tab-1" className="fade" id="tab-1">
                  <Row className="g-4">
                    {allGroups?.slice(0, 5).map((group, idx) => (
                      <Col sm={6} lg={4} key={idx}>
                        <GroupCard group={group} />
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane eventKey="tab-2" className="fade" id="tab-2">
                  <Row className="g-4">
                    {allGroups?.slice(5, 8).map((group, idx) => (
                      <Col sm={6} lg={4} key={idx}>
                        <GroupCard group={group} />
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                <TabPane eventKey="tab-3" className="fade" id="tab-3">
                  <GroupNotFound />
                </TabPane>
                <TabPane eventKey="tab-4" className="fade" id="tab-4">
                  <GroupNotFound />
                </TabPane>
              </TabContent>
            </TabContainer>
          </CardBody>
        </Card>
      </CardBody>

      <Modal
        show={isOpen}
        onHide={toggle}
        className="fade"
        id="modalCreateGroup"
        tabIndex={-1}
        aria-labelledby="modalLabelCreateGroup"
        aria-hidden="true">
        <ModalHeader closeButton>
          <h5 className="modal-title" id="modalLabelCreateGroup">
            Create Group
          </h5>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label className="form-label">Group name</label>
              <input type="text" className="form-control" placeholder="Add Group name here" />
            </div>
            <div className="mb-3">
              <label className="form-label">Group picture</label>
              <div className="d-flex align-items-center">
                <div className="me-3 avatar-uploader">
                  <div className="avatar-edit">
                    <input type="file" id="avatarUpload" accept=".png, .jpg, .jpeg" />
                    <label htmlFor="avatarUpload">
                      <FaPencil />
                    </label>
                  </div>
                  <div className="avatar avatar-xl position-relative">
                    <img
                      id="avatar-preview"
                      className="avatar-img rounded-circle border border-white border-3 shadow"
                      src={placeholderImg}
                      alt=""
                    />
                  </div>
                </div>
                <div className="avatar-remove">
                  <Button variant="light" type="button" id="avatar-reset-img">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label d-block">Select audience</label>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="PublicRadioOptions" id="publicRadio1" defaultValue="option1" />
                <label className="form-check-label" htmlFor="publicRadio1">
                  Public
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="PublicRadioOptions" id="privateRadio2" defaultValue="option2" />
                <label className="form-check-label" htmlFor="privateRadio2">
                  Private
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Invite friend </label>
              <input type="text" className="form-control" placeholder="Add friend name here" />
            </div>
            <div className="mb-3">
              <label className="form-label">Group description </label>
              <textarea className="form-control" rows={3} placeholder="Description here" defaultValue={''} />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="success-soft" type="button">
            Create now
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
export default AllGroups
