import { Card, Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import ChatArea from './components/ChatArea'
import ChatToggler from './components/ChatToggler'
import ChatUserList from './components/ChatUserList'
import MessageToast from './components/MessageToast'
import PageMetaData from '@/components/PageMetaData'

const Messaging = () => {
  const [totalChats, setTotalChats] = useState(0)
  return (
    <>
    <PageMetaData title='Messaging'/>
    <main style={{paddingLeft : '5vw',height : '100vh',backgroundColor : 'white'}}>
      <div style={{}} >
        <Row className="gx-0">
          <Col lg={4} xxl={3}>
            <div className="d-flex align-items-center mb-4 d-lg-none" >
              <ChatToggler />
          </div>
            <Card className="card-body" style={{marginTop : '80px'}}>
              <div className=" d-flex justify-content-between align-items-center">
                <h1 className="h5 mb-0">
                  Active chats <span className="badge bg-success bg-opacity-10 text-success">{totalChats}</span>
                </h1>

                <MessageToast />
              </div>
            </Card>
            <nav className="navbar navbar-light navbar-expand-lg mx-0">
              <ChatUserList setTotalChats={setTotalChats} />
            </nav>
          </Col>
          <Col lg={8} xxl={9}>
            <ChatArea />
          </Col>
        </Row>
      </div>
    </main>
    </>
  )
}
export default Messaging