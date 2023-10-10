import React, { useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// users
import user1 from "../../../assets/img/logo.png"
import useSWR from "swr"
import { AuthApi } from "api"

const ProfileMenu = () => {
  const [menu, setMenu] = useState(false)
  const { data } = useSWR("swr.user.me", async () => {
    const res = await AuthApi.me()
    return res
  })

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {data?.data?.name}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Гарах</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withRouter(ProfileMenu)
