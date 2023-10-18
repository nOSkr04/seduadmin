import { customPost, del, get, post, put } from "helpers/api_helper"

export const getStorys = async ({ page, limit }) => {
  const res = await get(`/storys?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}
export const getStory = async id => {
  const res = await get(`/storys/${id}`)
  return res
}

export const deleteStory = async id => {
  const res = await del(`/storys/${id}`)
  return res
}

export const createStory = async data => {
  const res = await post("/storys", data)
  return res
}

export const editStory = async Story => {
  const res = put(`/storys/${ad.id}`, {
    name: Story.name,
  })
  return res
}

export const videoUpload = async data => {
  const res = customPost("https://seduback.com/media/video", data)
  return res
}
