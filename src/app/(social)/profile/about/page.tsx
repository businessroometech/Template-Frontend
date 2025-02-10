import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { interestsData } from './data'

import PageMetaData from '@/components/PageMetaData'
import { BsBriefcase, BsCalendarDate, BsEnvelope, BsGeoAlt, BsHeart, BsPencilSquare, BsPlusCircleDotted, BsThreeDots, BsTrash } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import InvestorCards from './AboutInvestor'
import AboutBusinessBuyer from './AboutBusinessBuyer'
import AboutFounder from './AboutFounder'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/useAuthContext'

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
  const [subrole, setSubrole] = useState("");
  const {user} = useAuthContext(); // Replace with actual user ID from context or props
  const { id } = useParams();
console.log("----------------------------",id)


const handledelete = async () => {
   await fetch(`http://13.216.146.100/api/v1/subrole/delete/${id}` , {
    method :"DELETE"
   })
}


  useEffect(() => {
    const fetchSubrole = async () => {
      try {
        const response = await fetch(`http://13.216.146.100/api/v1/subrole/get/${id}`);
        console.log("----------" ,user?.id)
        const data = await response.json();
        console.log("-------ddd----------" , data.data.SubRole )
        setSubrole(data.data.SubRole); 
        console.log("----SubRole-----", data.data.SubRole)
      } catch (error) {
        console.error("Error fetching subrole:", error);
      }
    };

    fetchSubrole();
  }, []);

  return (
<div style={{ width: "100%" }}>
  <PageMetaData title="About" />
  <Card>
    {/* <CardHeader className="border-0 pb-0">
      {/* <CardTitle>Business Profile Information</CardTitle> }
    </CardHeader> */}
    <CardBody>
      {subrole === "BusinessBuyer" && <AboutBusinessBuyer />}
      {subrole === "Investor" && <InvestorCards />}
      {subrole === "Founder" && <AboutFounder />}
      {subrole === "BusinessSeller" && (
        <><div>
              <p>Business Seller</p>
              <p>Visit AquireRoom To see All Listed Business</p>
              <Link to="/marketplace">
                <Button>AcquireRoom</Button>
              </Link>


            </div>

            <Button
  onClick={handledelete}
  className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
>
  🗑 Delete Business Seller Profile
</Button>
            
            </>
      )}

      {(subrole === "" || subrole == null) && <p>No About Section Was Created by the user.</p>}
    </CardBody>
  </Card>
  <Interests />
</div>
  );
};

export default About;