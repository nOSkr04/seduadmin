import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Article
import Artcile from "../pages/Article/index"
import CreateArticle from "pages/Article/create-article"
import Users from "../pages/Users/index"
import Banner from "pages/Banner"
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  // article
  { path: "/article", component: <Artcile /> },
  { path: "/article-add", component: <CreateArticle /> },
  // //profile
  { path: "/profile", component: <UserProfile /> },
  // users
  { path: "/user", component: <Users /> },
  // banner
  { path: "/ads", component: <Banner /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
]

export { authProtectedRoutes, publicRoutes }
