import React, { useState } from "react"
import { Card, Col, Row } from "reactstrap"
// import img1 from "../../../assets/images/small/img-2.jpg"
import { Link } from "react-router-dom"
import useSWR from "swr"
import { LessonApi } from "api"
import Spinners from "components/Common/Spinner"
import moment from "moment/moment"
import Paginations from "components/Common/Pagination"
import DeleteModal from "components/Common/DeleteModal"

const LessonGrid = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const { isLoading, data, mutate } = useSWR(
    `swr.lesson.${pageIndex}`,
    async () => {
      const res = await LessonApi.getLessons({ page: pageIndex, limit: 10 })
      return res
    }
  )

  const handleDeleteOrder = post => {
    setDeleteModal(true)
    setDeleteId(post._id)
  }

  const onClickDelete = async () => {
    try {
      await LessonApi.deleteLesson(deleteId)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      console.log(err, "err")
    } finally {
      setDeleteModal(false)
    }
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={onClickDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Col xl={12} lg={8}>
        {isLoading ? (
          <Spinners />
        ) : (
          <Card>
            <div className="mt-5">
              <Row className="justify-content-center">
                <Col xl={8}>
                  <div>
                    <div className="row align-items-center">
                      <div className="col-4">
                        <div>
                          <h5 className="mb-0">Сургалт</h5>
                        </div>
                      </div>
                    </div>

                    <hr className="mb-4" />

                    <Row>
                      {data?.data?.map(post => {
                        return (
                          <Col xl={6} key={post._id}>
                            <Card className="p-1 border shadow-none">
                              <Row>
                                <Col className="p-3">
                                  <h5>
                                    <Link
                                      to={`/lesson-detail/${post._id}`}
                                      className="text-dark"
                                    >
                                      {post.title}
                                    </Link>
                                  </h5>
                                  <p className="text-muted mb-0">
                                    {moment(post.createdAt).format(
                                      "YYYY-MM-DD hh:mm"
                                    )}
                                  </p>
                                </Col>
                                {/*  */}
                                <Col className="p-3">
                                  <Link
                                    to="#"
                                    onClick={() => handleDeleteOrder(post)}
                                  >
                                    <i className="mdi mdi-trash-can font-size-24 text-danger me-1" />{" "}
                                  </Link>
                                </Col>
                              </Row>

                              <div className="position-relative">
                                <img
                                  src={
                                    "https://sedu-ba.s3.ap-southeast-1.amazonaws.com/4661a367-ee08-4cc6-a175-a849bf7bed67.jpg"
                                  }
                                  alt=""
                                  className="img-thumbnail"
                                />
                              </div>

                              <div className="p-3">
                                <ul className="list-inline">
                                  <Link to="#" className="text-muted">
                                    <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                    {post.duration} Хугацаа
                                  </Link>
                                </ul>

                                <div>
                                  <Link
                                    to={`/lesson-detail/${post._id}`}
                                    className="text-primary"
                                  >
                                    Дэлгэрэнгүй
                                    <i className="mdi mdi-arrow-right"></i>
                                  </Link>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                    <hr className="my-4" />
                    <Paginations
                      perPageData={pageIndex * 10}
                      currentPage={pageIndex}
                      setCurrentPage={setPageIndex}
                      isShowingPageLength={false}
                      paginationDiv="col-12"
                      paginationClass="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1"
                      count={data?.pagination}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        )}
      </Col>
    </React.Fragment>
  )
}
export default LessonGrid
