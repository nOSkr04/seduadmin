import React from "react"
import { useParams } from "react-router-dom"
import { Container, Card, CardBody, Col, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// import images
import useSWR from "swr"
import { LessonApi } from "api"
import moment from "moment/moment"
import Spinners from "components/Common/Spinner"

const LessonDetail = () => {
  let { id } = useParams()
  document.title = "Хэлэлцүүлэг дэлгэрэнгүй"
  const { data, isLoading } = useSWR(`swr.lesson.${id}`, async () => {
    const res = await LessonApi.getLesson(id)
    return res
  })

  if (!data?.data) {
    return null
  }

  return (
    <React.Fragment>
      <div className="page-content">
        {isLoading ? (
          <Spinners />
        ) : (
          <Container fluid>
            <Breadcrumbs
              title="Хэлэлцүүлэг"
              breadcrumbItem="Хэлэлцүүлэг дэлгэрэнгүй"
            />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="pt-3">
                      <div className="row justify-content-center">
                        <div className="col-xl-8">
                          <div>
                            <div className="text-center">
                              <h4>{data.data.title}</h4>
                              <p className="text-muted mb-4">
                                <i className="mdi mdi-calendar me-1"></i>{" "}
                                {moment(data.createdAt).format("YYYY-MM-DD")}
                              </p>
                            </div>
                            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                              <iframe
                                title="test"
                                className="embed-responsive-item"
                                src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                              />
                            </div>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}

export default LessonDetail
