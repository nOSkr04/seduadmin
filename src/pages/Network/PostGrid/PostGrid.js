import React, { useState } from "react"
import { Card, Col, NavItem, NavLink, Row } from "reactstrap"
import img1 from "../../../assets/images/small/img-2.jpg"
import { Link } from "react-router-dom"
import useSWR from "swr"
import { NetowrkApi } from "api"
import Spinners from "components/Common/Spinner"
import moment from "moment/moment"
import Paginations from "components/Common/Pagination"
import DeleteModal from "components/Common/DeleteModal"

const PostGrid = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const { isLoading, data, mutate } = useSWR(
    `swr.article.${pageIndex}`,
    async () => {
      const res = await NetowrkApi.getPosts({ page: pageIndex, limit: 10 })
      return res
    }
  )

  const handleDeleteOrder = post => {
    setDeleteModal(true)
    setDeleteId(post._id)
  }

  const onClickDelete = async () => {
    try {
      await NetowrkApi.deletePost(deleteId)
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
                          <h5 className="mb-0">Хэлэлцүүлэг</h5>
                        </div>
                      </div>

                      <Col xs={8}>
                        <div className="float-end">
                          <ul className="nav nav-pills">
                            <NavItem>
                              <NavLink
                                className="disabled"
                                to="#"
                                tabIndex="-1"
                              >
                                Харагдах :
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <Link className="nav-link" to="/network-list">
                                <i className="mdi mdi-format-list-bulleted"></i>
                              </Link>
                            </NavItem>
                            <NavItem>
                              <Link
                                to="/network-grid"
                                className="nav-link active"
                              >
                                <i className="mdi mdi-view-grid-outline"></i>
                              </Link>
                            </NavItem>
                          </ul>
                        </div>
                      </Col>
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
                                      to={`/post-detail/${post._id}`}
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
                                    post.photo
                                      ? `https://seduback.com/upload/${post.photo}`
                                      : img1
                                  }
                                  alt=""
                                  className="img-thumbnail"
                                />
                              </div>

                              <div className="p-3">
                                <ul className="list-inline">
                                  <li className="list-inline-item me-3">
                                    <Link to="#" className="text-muted">
                                      <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                      {post.like}
                                      Таалагдсан
                                    </Link>
                                  </li>
                                  <li className="list-inline-item me-3">
                                    <Link to="#" className="text-muted">
                                      <i className="bx bx-comment-dots align-middle text-muted me-1"></i>{" "}
                                      {post.comment} Сэтгэгдэл
                                    </Link>
                                  </li>
                                </ul>
                                <p>{post.body}</p>

                                <div>
                                  <Link
                                    to={`/post-detail/${post._id}`}
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
export default PostGrid
