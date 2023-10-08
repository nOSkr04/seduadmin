import { post, get } from "../helpers/api_helper"

export const me = async () => {
  const res = get("/users/me")
  return res
}

export const login = async user => {
  const res = post("/users/login", user)
  return res
}

export const logout = async () => {
  const res = await get("/users/logout")
  return res
}
