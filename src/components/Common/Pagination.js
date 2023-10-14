import { Link } from "react-router-dom"
import React from "react"
import { Row } from "reactstrap"

const Paginations = ({
  perPageData,
  count,
  currentPage,
  setCurrentPage,
  paginationDiv,
  paginationClass,
}) => {
  //pagination
  const handleprevPage = () => {
    let prevPage = currentPage - 1
    setCurrentPage(prevPage)
  }
  const handlenextPage = () => {
    let nextPage = currentPage + 1
    setCurrentPage(nextPage)
  }

  return (
    <React.Fragment>
      <Row className="justify-content-between align-items-center">
        <div className="col-sm">
          <div className="text-muted">
            Харуулах <span className="fw-semibold">{perPageData}</span> аас{" "}
            <span className="fw-semibold">{count.total}</span> байна
          </div>
        </div>
        <div className={paginationDiv}>
          <ul className={paginationClass}>
            {count.prevPage && (
              <li className={`page-item`}>
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handleprevPage()}
                >
                  <i className="mdi mdi-chevron-left"></i>
                </Link>
              </li>
            )}
            <li className={"page-item active"}>
              <Link className="page-link" to="#">
                {currentPage}
              </Link>
            </li>
            {count.nextPage && (
              <li className={`page-item`}>
                <Link className="page-link" to="#" onClick={handlenextPage}>
                  <i className="mdi mdi-chevron-right"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Row>
    </React.Fragment>
  )
}

export default Paginations
