import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Card,
} from "reactstrap"
import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import Spinners from "components/Common/Spinner"
import Paginations from "components/Common/Pagination"
import useSWR from "swr"
import { AdsApi } from "api"
import DeleteModal from "components/Common/DeleteModal"
import { useForm } from "react-hook-form"
import Dropzone from "react-dropzone"
import authHeader from "helpers/jwt-token-access/auth-token-header"

const Banner = () => {
  document.title = "Зарууд"
  const [pageIndex, setPageIndex] = useState(1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [photoModal, setPhotoModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [photo, setPhoto] = useState("")
  const [selectedFiles, setselectedFiles] = useState([])
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onChange",
  })

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const { data, isLoading, mutate } = useSWR(`swr.ads`, async () => {
    const res = await AdsApi.getAds()
    return res
  })

  const onClickDelete = async ad => {
    try {
      await AdsApi.deleteAds(ad._id)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      console.log(err, "err")
    } finally {
    }
    // setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    setDeleteModal(false)
  }

  const toggle = () => {
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }
  const togglePhoto = () => {
    if (photoModal) {
      setPhotoModal(false)
    } else {
      setPhotoModal(true)
    }
  }

  const handleUserClick = arg => {
    setIsEdit(true)
    reset(arg)
    toggle()
  }

  const handlePhotoClick = arg => {
    setPhoto(arg)
    togglePhoto()
  }

  const onSubmit = async data => {
    console.log(data)
    try {
      await AdsApi.editAds(data)
      setTimeout(() => {
        mutate()
      }, 500)
    } catch (err) {
      console.log(err, "err")
    } finally {
      toggle()
    }
  }

  const photoOnSubmit = async () => {
    const data = new FormData()
    const xhr = new XMLHttpRequest()
    data.append("file", selectedFiles[0])
    xhr.open("file", selectedFiles[0])
    xhr.open(
      "PUT",
      `https://seduback.com/api/v1/ads/${photo._id}/photo`,
      true
    )
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${authHeader().Authorization}`
    )
    xhr.onload = function (e) {
      console.log("Request Status", xhr.status, e)
    }
    xhr.upload.onprogress = function (e) {
      if (e.loaded === e.total) {
        setTimeout(() => {
          mutate()
        }, 500)
      }
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        console.log(`Upload progress: ${Math.round(percentComplete)}%`)
      }
    }
    xhr.send(data)
    togglePhoto()
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Зарууд" breadcrumbItem="Зар жагсаалт" />

          {isLoading ? (
            <Spinners />
          ) : (
            <Row>
              <Col lg="12">
                <div>
                  <div className="table-responsive">
                    <Table className="project-list-table table-nowrap align-middle table-borderless">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "100px" }}>
                            #
                          </th>
                          <th scope="col">Гарчиг</th>
                          <th scope="col">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data?.map(ad => {
                          return (
                            <tr key={ad.id}>
                              <td>
                                <img
                                  src={`https://seduback.com/upload/${ad.photo}`}
                                  alt=""
                                  className="avatar-sm"
                                />
                              </td>
                              <td>
                                <h5 className="text-truncate font-size-14">
                                  <Link
                                    to={`/projects-overview/${ad.id}`}
                                    className="text-dark"
                                  >
                                    {ad.name}
                                  </Link>
                                </h5>
                              </td>
                              <td>
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    href="#"
                                    className="card-drop"
                                    tag="a"
                                  >
                                    <i className="mdi mdi-dots-horizontal font-size-18" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem
                                      href="#"
                                      onClick={() => {
                                        handleUserClick(ad)
                                      }}
                                    >
                                      <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                      Өөрчлөх
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#"
                                      onClick={() => handlePhotoClick(ad)}
                                    >
                                      <i className="mdi mdi-image font-size-16 text-warn me-1" />{" "}
                                      Зураг
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#"
                                      onClick={() => onClickDelete(ad)}
                                    >
                                      <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                      Устгах
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {/* information */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Өөрчлөх" : "Add Project"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label className="form-label">Гарчиг</Label>
                      <input
                        name="name"
                        type="text"
                        {...register("name")}
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
          {/* photo */}
          <Modal isOpen={photoModal} toggle={togglePhoto}>
            <ModalHeader toggle={togglePhoto} tag="h4">
              Зураг өөрчлөх
            </ModalHeader>
            <ModalBody>
              <img
                src={
                  selectedFiles[0]
                    ? selectedFiles[0].preview
                    : `https://seduback.com/upload/${photo.photo}`
                }
                width={"100%"}
                height={300}
              />
              <Dropzone
                onDrop={acceptedFiles => {
                  handleAcceptedFiles(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone">
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <input {...getInputProps()} multiple={false} />
                      <div className="dz-message needsclick">
                        <div className="mb-3">
                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                        </div>
                        <h4>Drop files here or click to upload.</h4>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="dropzone-previews mt-3" id="file-previews">
                {selectedFiles?.map((f, i) => {
                  return (
                    <Card
                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                      key={i + "-file"}
                    >
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={f.name}
                              src={f.preview}
                            />
                          </Col>
                          <Col>
                            <Link
                              to="#"
                              className="text-muted font-weight-bold"
                            >
                              {f.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{f.formattedSize}</strong>
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  )
                })}
              </div>
              <Row>
                <Col>
                  <div className="text-end mt-3">
                    <button
                      onClick={photoOnSubmit}
                      className="btn btn-success save-user"
                    >
                      Хадгалах
                    </button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          <Row>
            {!isLoading && (
              <Paginations
                perPageData={pageIndex * 10}
                currentPage={pageIndex}
                setCurrentPage={setPageIndex}
                isShowingPageLength={false}
                paginationDiv="col-12"
                paginationClass="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1"
                count={data.pagination.total}
              />
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Banner)
