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
import CreateBanner from "pages/Banner/create-ads"
import PostGrid from "pages/Network/PostGrid/index"
import PostList from "pages/Network/PostList/index"
import PostDetails from "pages/Network/PostDetails"
import LessonGrid from "pages/lesson/LessonGrid/index"
import LessonDetail from "pages/lesson/LessonDetail"
import CreateLesson from "pages/lesson/LessonGrid/create-lesson"
import StroyGrid from "pages/story/StoryGrid/StroyGrid"
import CreateStory from "pages/story/StoryGrid/create-story"
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
  { path: "/ads-add", component: <CreateBanner /> },
  // Network
  { path: "/network-grid", component: <PostGrid /> },
  { path: "/network-list", component: <PostList /> },
  { path: "/post-detail/:id", component: <PostDetails /> },
  // Lesson
  { path: "/lessons", component: <LessonGrid /> },
  { path: "/lesson-detail/:id", component: <LessonDetail /> },
  { path: "/create-lesson", component: <CreateLesson /> },
  // Story
  { path: "/storys", component: <StroyGrid /> },
  { path: "/story-add", component: <CreateStory /> },

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
