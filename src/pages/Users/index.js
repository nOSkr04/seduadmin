import React, { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  UncontrolledTooltip,
} from "reactstrap"

import { Deadline } from "./contactlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import Spinners from "components/Common/Spinner"
import { ToastContainer } from "react-toastify"
import useSWR from "swr"
import { UsersApi } from "api"
import { useForm } from "react-hook-form"

const Users = () => {
  //meta title
  document.title = "Хэрэглэгчид"
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
    // control,
  } = useForm({
    reValidateMode: "onChange",
  })
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [pageIndex, setPageIndex] = useState(1)
  const { data, isLoading } = useSWR(`swr.user.${pageIndex}`, async () => {
    const res = await UsersApi.getUsers({ page: pageIndex, limit: 10 })
    return res
  })

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {cellProps.name.charAt(0)}
              </span>
            </div>
          </>
        ),
      },
      {
        Header: "Нэр",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          )
        },
      },
      {
        Header: "Дуусах/Хугацаа",
        accessor: "deadline",
        filterable: true,
        Cell: cellProps => {
          return <Deadline {...cellProps} />
        },
      },
      {
        Header: "Үүсгэсэн/Хугацаа",
        accessor: "createdAt",
        filterable: true,
        Cell: cellProps => {
          return <Deadline {...cellProps} />
        },
      },
      {
        Header: "СТ/Хугацаа",
        accessor: "lastPayment",
        filterable: true,
        Cell: cellProps => {
          return <Deadline {...cellProps} />
        },
      },
      {
        Header: "Үйлдэл",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Өөрчлөх
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Устгах
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    reset(arg)
    setIsEdit(true)

    toggle()
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    // setContact(users)
    console.log(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id))
    }
    // onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    // setUserList("")
    setIsEdit(false)
    toggle()
  }

  const onSubmit = async data => {
    console.log("first", data)
    toggle()
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            {isLoading ? (
              <Spinners />
            ) : (
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={data.data}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      isAddUserList={true}
                      iscustomPageSizeOptions={true}
                      handleUserClick={handleUserClicks}
                      customPageSize={10}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                      paginations={data.pagination}
                      setPageIndex={setPageIndex}
                      pageIndex={pageIndex}
                    />
                  </CardBody>
                </Card>
              </Col>
            )}

            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} tag="h4">
                {!!isEdit ? "Хэрэглэгч засах" : "Шинэ хэрэглэгч"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col xs={12}>
                      <div className="mb-3">
                        <Label className="form-label">Нэр</Label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Нэрээ оруулна уу"
                          {...register("name")}
                          className="form-control"
                        />
                      </div>
                      {!isEdit && (
                        <div className="mb-3">
                          <Label className="form-label">Нууц үг</Label>
                          <input
                            name="password"
                            type="password"
                            placeholder="Нууц үг оруулна уу"
                            {...register("password")}
                            className="form-control"
                          />
                        </div>
                      )}
                      <div className="mb-3">
                        <Label className="form-label">Хэрэглэгчийн эрх</Label>
                        <input
                          name="deadline"
                          placeholder="Хэрэглэгчийн эрх"
                          type="text"
                          {...register("deadline")}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-success save-user"
                        >
                          Хадгалах
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </ModalBody>
            </Modal>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default withRouter(Users)
