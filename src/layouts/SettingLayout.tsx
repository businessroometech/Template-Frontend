
import { lazy, Suspense } from 'react'
import { settingPanelLinksData } from '@/assets/data/layout'
import SettingPanel from '@/components/layout/SettingPanel'
import { useLayoutContext } from '@/context/useLayoutContext'
import useViewPort from '@/hooks/useViewPort'
const TopHeader = lazy(() => import("@/components/layout/TopHeader"))
import type { ChildrenType } from '@/types/component'
import { Col, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from 'react-bootstrap'
import { FaSlidersH } from 'react-icons/fa'
import FallbackLoading from '@/components/FallbackLoading'
import Preloader from '@/components/Preloader'

const SettingLayout = ({ children }: ChildrenType) => {
  const { width } = useViewPort()
  const { startOffcanvas } = useLayoutContext()
  return (
   <div style={{marginLeft:"4.5%", width:"94.5%",backgroundColor : 'white' }}>
      <Suspense fallback={<FallbackLoading />}>
        <TopHeader />
      </Suspense>
      <main style={{backgroundColor : 'white'}}>
        
          <Row>
            <Col lg={3}>
              <div className="d-flex align-items-center mb-4 d-lg-none" >
                <button
                  onClick={startOffcanvas.toggle}
                  className="border-0 bg-transparent"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar">
                  <span className="btn btn-primary">
                    <FaSlidersH />
                  </span>
                  <span className="h6 mb-0 fw-bold d-lg-none ms-2">Settings</span>
                </button>
              </div>
              <nav className="navbar navbar-light navbar-expand-lg mx-0">
                {width >= 992 ? (
                  <div className="p-0">
                    <SettingPanel links={settingPanelLinksData} />
                  </div>
                ) : (
                  <Offcanvas show={startOffcanvas.open} onHide={startOffcanvas.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
                    <OffcanvasHeader closeButton />
                    <OffcanvasBody className="p-0">
                      <div>
                        <SettingPanel links={settingPanelLinksData} />
                      </div>
                    </OffcanvasBody>
                  </Offcanvas>
                )}
              </nav>
            </Col>
            <Col lg={6} className="vstack gap-4">
              <div className="tab-content py-0 mb-0" style={{marginRight:"60px"}}>
                <Suspense fallback={<Preloader/>}>
                  {children}
                </Suspense>
              </div>
            </Col>
          </Row>
        
      </main>
      </div>
  )
}
export default SettingLayout
