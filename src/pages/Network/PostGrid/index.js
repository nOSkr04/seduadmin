import React from "react"
import { Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import PostGrid from "./PostGrid"

const Index = () => {
  //meta title
  document.title = "Хэлэлцүүлэг"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Хэлэлцүүлэг" breadcrumbItem="Хэлэлцүүлэг хос" />
          <Row>
            <PostGrid />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index
