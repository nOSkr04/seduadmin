import { del, get, post, put } from "helpers/api_helper"

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
