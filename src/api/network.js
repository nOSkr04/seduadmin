import { del, get, post, put } from "helpers/api_helper"

export const getPosts = async () => {
  const res = await get(`/posts`)
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
