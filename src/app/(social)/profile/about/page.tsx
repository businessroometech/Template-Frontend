import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { interestsData } from './data'

import PageMetaData from '@/components/PageMetaData'
import { BsBriefcase, BsCalendarDate, BsEnvelope, BsGeoAlt, BsHeart, BsPencilSquare, BsPlusCircleDotted, BsThreeDots, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import InvestorCards from './AboutInvestor'
import AboutBusinessBuyer from './AboutBusinessBuyer'
import AboutFounder from './AboutFounder'

const Interests = () => {
  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between border-0 pb-0">
        <CardTitle>Interests</CardTitle>
        <Button variant="primary-soft" size="sm">
          
          See all
        </Button>
      </CardHeader>
      <CardBody>
        <Row className="g-4">
          {interestsData.map((item, idx) => (
            <Col sm={6} lg={4} key={idx}>
              <div className="d-flex align-items-center position-relative">
                <div className="avatar">
                  <img className="avatar-img" src={item.image} alt="image" />
                </div>
                <div className="ms-2">
                  <h6 className="mb-0">
                    
                    <Link className="stretched-link" to="">
                      {item.name}
                    </Link>
                  </h6>
                  <p className="small mb-0">{item.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

const ActionDropdown = () => {
  return (
    <Dropdown className="ms-auto">
      <DropdownToggle
        as="a"
        className="nav nav-link text-secondary mb-0"
        role="button"
        id="aboutAction"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <BsThreeDots />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end" aria-labelledby="aboutAction">
        <li>
          <DropdownItem>
            
            <BsPencilSquare size={22} className="fa-fw pe-2" />
            Edit
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsTrash size={22} className="fa-fw pe-2" />
            Delete
          </DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>
  )
}

const About = () => {


  return (
    <div style={{width:"130%"}}>
    <PageMetaData title='About'/>
      <Card>
        <CardHeader className="border-0 pb-0">
          <CardTitle>Business Profile Info</CardTitle>
        </CardHeader>
        <CardBody>
{/* <InvestorCards></InvestorCards> */}
{/* <AboutBusinessBuyer></AboutBusinessBuyer> */}
<AboutFounder></AboutFounder>
        </CardBody>
      </Card>
      <Interests />
      </div>
  )
}
export default About
