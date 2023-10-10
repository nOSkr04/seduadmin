import { del, get, post, put } from "helpers/api_helper"

export const getAds = async () => {
  const res = await get(`/ads`)
  return res
}
export const getAd = async id => {
  const res = await get(`/ads/${id}`)
  return res
}

export const deleteAds = async id => {
  const res = await del(`/ads/${id}`)
  return res
}

export const createAds = async data => {
  const res = await post("/ads", data)
  return res
}

export const editAds = async ad => {
  const res = put(`/ads/${ad.id}`, {
    name: ad.name,
  })
  return res
}
