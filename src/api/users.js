import { del, get, put } from "helpers/api_helper"

export const getUsers = async ({ page, limit }) => {
  const res = await get(`/users?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}
export const getArticle = async id => {
  const res = await get(`/users/${id}`)
  return res
}

export const deleteArticle = async id => {
  const res = await del(`/users/${id}`)
  return res
}

export const editArticle = async article => {
  const res = put(`/users/${article.id}`, {
    name: article.name,
    description: article.description,
  })
  return res
}
