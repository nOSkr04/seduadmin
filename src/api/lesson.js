import { customPost, del, get, post, put } from "helpers/api_helper"

export const getLessons = async ({ page, limit }) => {
  const res = await get(`/lessons?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}
export const getLesson = async id => {
  const res = await get(`/lessons/${id}`)
  return res
}

export const deleteLesson = async id => {
  const res = await del(`/lessons/${id}`)
  return res
}

export const createLesson = async data => {
  const res = await post("/lessons", data)
  return res
}

export const editLesson = async Lesson => {
  const res = put(`/lessons/${ad.id}`, {
    name: Lesson.name,
  })
  return res
}

export const videoUpload = async data => {
  console.log(data, "a")
  const res = customPost("https://seduback.com/media/video", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Set content type for FormData
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.lengthComputable) {
        const percentComplete =
          (progressEvent.loaded / progressEvent.total) * 100
        console.log(`Upload progress: ${Math.round(percentComplete)}%`)
      }
    },
  })
  return res
}
