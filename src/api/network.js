import { del, get, post, put } from "helpers/api_helper"

export const getPosts = async ({ page, limit }) => {
  const res = await get(`/posts?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}
export const getPost = async id => {
  const res = await get(`/posts/${id}`)
  return res
}

export const deletePost = async id => {
  const res = await del(`/posts/${id}`)
  return res
}

export const createPost = async data => {
  const res = await post("/posts", data)
  return res
}

export const editPost = async post => {
  const res = put(`/posts/${ad.id}`, {
    name: post.name,
  })
  return res
}
