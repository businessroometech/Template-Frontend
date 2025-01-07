import { Col, Container, Row } from 'react-bootstrap'
import Topbar from './components/Topbar'
import ContactSidebar from './components/ContactSidebar'
import LeftSidebar from './components/LeftSidebar'
import Feeds from './components/Feeds'
import Stories from './components/Stories'
import CreatePostCard from '@/components/cards/CreatePostCard'
import PostCard from '@/components/cards/PostCard'

const ClassicHome = () => {
  return (
    <>
      <Topbar />

      <main>
        <Container fluid>
          <Row className="justify-content-between g-0">
            <Col md={2} lg={3} xxl={4} className="mt-n4">
              <LeftSidebar />
            </Col>
            
            <Col md={8} lg={6} xxl={4} className="vstack gap-4">
              <Stories />
              <CreatePostCard />
             
              <PostCard item={{
                "Id": "4cc99455a7cda63ebfd8ad38846b9e5f",
                "userId": "018faa07809d523c34ac1186d761459d",
                "title": null,
                "content": "",
                "hashtags": [],
                "mediaKeys": [],
                "likeCount": 0,
                "commentCount": 0,
                "likeStatus": false
              }}/>
            </Col>
            <Col md={2} lg={3} xxl={4}>
              <ContactSidebar />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}
export default ClassicHome
