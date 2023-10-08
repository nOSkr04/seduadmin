import { del, get, post, put, putFile } from "helpers/api_helper"

export const getArticles = async ({ page, limit }) => {
  const res = await get(`/articles?page=${page}&limit=${limit}&sort=-createdAt`)
  return res
}
export const getArticle = async id => {
  const res = await get(`/articles/${id}`)
  return res
}

export const deleteArticle = async id => {
  const res = await del(`/articles/${id}`)
  return res
}

export const createArticle = async data => {
  const res = await post("/articles", data)
  return res
}

export const editArticle = async article => {
  const res = put(`/articles/${article.id}`, {
    name: article.name,
    description: article.description,
  })
  return res
}
