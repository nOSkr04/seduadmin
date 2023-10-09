import PropTypes from "prop-types"
import React from "react"
import { Routes, Route } from "react-router-dom"
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// Import scss
import "./assets/scss/theme.scss"
import Sidebar from "components/VerticalLayout/Sidebar"
import Footer from "components/VerticalLayout/Footer"
import Header from "components/VerticalLayout/Header"

const App = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<React.Fragment>{route.component}</React.Fragment>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <React.Fragment>
                  <div id="layout-wrapper">
                    <Header />
                    <Sidebar type={"default"} isMobile={isMobile} />
                    <div className="main-content">{route.component}</div>
                    <Footer />
                  </div>
                </React.Fragment>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
