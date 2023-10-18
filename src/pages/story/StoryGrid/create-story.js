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
  Spinner,
} from "reactstrap"
//Import Breadcrumb
import { Controller, useForm } from "react-hook-form"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import { videoUpload } from "api/lesson"
import { StoryApi } from "api"

// import { LessonApi } from "api"

const CreateStory = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, reset } = useForm()

  //meta title
  document.title = "Сургалт үүсгэх"

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
    setLoading(true)
    try {
      const file = selectedFiles[0]
      const formData = new FormData()
      formData.append("file", file)
      const backVideo = await videoUpload(formData)
      const core = {
        title: data.name,
        url: backVideo.url,
        duration: backVideo.duration,
        photo: backVideo.image,
      }
      const res = await StoryApi.createStory(core)
      console.log(res)
      reset({
        name: "",
      })
    } catch (err) {
      console.log(err, "err")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" /> */}

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Сургалт нэмэх</CardTitle>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="outer-repeater"
                    >
                      <Dropzone
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles)
                        }}
                        accept={"video/*"}
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
                                <h4>Зөвхөн бичлэг</h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mb-3"
                        id="file-previews"
                      >
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
                        </div>
                      </div>
                      <Row className="justify-content-end">
                        <Col lg="10">
                          <Button type="submit" color="primary">
                            Сургалт үүсгэх
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CreateStory
