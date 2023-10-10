import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Controller, useForm } from "react-hook-form"
import WYSIWYGEditor from "components/article/WYSIWYGEditor"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import { ArticleApi } from "api"
import authHeader from "helpers/jwt-token-access/auth-token-header"

const CreateArticle = () => {
  const { control, handleSubmit, reset } = useForm()

  //meta title
  document.title = "Нийтлэл үүсгэх"

  const [selectedFiles, setselectedFiles] = useState([])

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

  const onSubmit = async data => {
    const create = {
      name: data.name,
      category: "5e90434cd433fa11b078ed8a",
      description: data.description,
    }
    try {
      const res = await ArticleApi.createArticle(create)
      if (res) {
        const formData = new FormData()
        const xhr = new XMLHttpRequest()
        formData.append("file", selectedFiles[0])
        xhr.open("file", selectedFiles[0])
        xhr.open(
          "PUT",
          `https://seduback.com/api/v1/articles/${res.data._id}/upload-photo`,
          true
        )
        xhr.setRequestHeader(
          "Authorization",
          `Bearer ${authHeader().Authorization}`
        )
        xhr.send(formData)
        xhr.onload = function (e) {
          console.log("Request Status", xhr.status, e)
        }
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100
            console.log(`Upload progress: ${Math.round(percentComplete)}%`)
          }
        }
      }
      reset({
        name: "",
        description: "",
      })
      setselectedFiles([])
    } catch (err) {
      console.log(err, "err")
    }
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Нийтлэл нэмэх</CardTitle>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="outer-repeater"
                  >
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
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
                    <div className="dropzone-previews mb-3" id="file-previews">
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
                    <div
                      data-repeater-list="outer-group mt-3"
                      className="outer"
                    >
                      <div data-repeater-item className="outer">
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="taskname"
                            className="col-form-label col-lg-2"
                          >
                            Гарчиг
                          </Label>
                          <Col lg="10">
                            <Controller
                              name="name"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="text"
                                  className="form-control"
                                  placeholder="Гарчиг"
                                />
                              )}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">
                            Агуулга
                          </Label>
                          <Col lg="10">
                            <Controller
                              render={({ field }) => (
                                <WYSIWYGEditor {...field} />
                              )}
                              name="description"
                              control={control}
                              defaultValue=""
                            />
                          </Col>
                        </FormGroup>
                      </div>
                    </div>
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          Create Task
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CreateArticle
