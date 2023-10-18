import React from "react"
import { Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import StroyGrid from "./StroyGrid"

const Index = () => {
  //meta title
  document.title = "Сургалт"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Сургалт" breadcrumbItem="Сургалт" />
          <Row>
            <StroyGrid />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index
