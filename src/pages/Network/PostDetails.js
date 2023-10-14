import React from "react"
import { useParams } from "react-router-dom"
import { Container, Card, CardBody, Col, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// import images
import img1 from "../../assets/images/small/img-2.jpg"
import useSWR from "swr"
import { NetowrkApi } from "api"
import moment from "moment/moment"
import Spinners from "components/Common/Spinner"

const PostDetails = () => {
  let { id } = useParams()
  document.title = "Хэлэлцүүлэг дэлгэрэнгүй"
  const { data, isLoading } = useSWR(`swr.article.${id}`, async () => {
    const res = await NetowrkApi.getPost(id)
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
                            <div className="my-5">
                              <img
                                src={img1}
                                alt=""
                                className="img-thumbnail mx-auto d-block"
                              />
                            </div>

                            <hr />

                            <div className="mt-4">
                              <div className="text-muted font-size-14">
                                <p>{data.data.body}</p>
                              </div>

                              <hr />

                              <div className="mt-5">
                                <h5 className="font-size-15">
                                  <i className="bx bx-message-dots text-muted align-middle me-1"></i>{" "}
                                  Сэтгэгдэл :
                                </h5>

                                <div>
                                  <div className="d-flex py-3">
                                    <div className="avatar-xs me-3">
                                      <div className="avatar-title rounded-circle bg-light text-primary">
                                        <i className="bx bxs-user"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1">
                                      <h5 className="font-size-14 mb-1">
                                        Delores Williams{" "}
                                        <small className="text-muted float-end">
                                          1 hr Ago
                                        </small>
                                      </h5>
                                      <p className="text-muted">
                                        If several languages coalesce, the
                                        grammar of the resulting language is
                                        more simple and regular than that of the
                                        individual
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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

export default PostDetails
