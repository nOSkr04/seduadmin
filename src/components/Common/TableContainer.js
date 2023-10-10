import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table"
import { Table, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter, paginations }) {
  const count = paginations.total
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Хэрэглэгч хайх
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value)
                  onChange(e.target.value)
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} хэрэглэгч...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,

  customPageSize,
  isPagination,
  isShowingPageLength,
  paginationDiv,
  pagination,
  tableClass,
  theadClass,
  paginations,
  setPageIndex,
  pageIndex,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      // defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  )

  return (
    <Fragment>
      <Row className="mb-2">
        {isGlobalFilter && (
          <GlobalFilter
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            paginations={paginations}
          />
        )}
      </Row>

      <div className="table-responsive">
        <Table {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id}
                    className={column.isSort ? "sorting" : ""}
                  >
                    <div className="m-0" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                    </div>
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>
      {isPagination && (
        <Row className="justify-content-between align-items-center">
          {isShowingPageLength && (
            <div className="col-sm">
              <div className="text-muted">
                Харуулж буй{" "}
                {/* <span className="fw-semibold">{data.pagination.end}</span> of{" "} */}
                <span className="fw-semibold">{data.length}</span> entries
              </div>
            </div>
          )}
          {console.log(pageIndex, paginations.pageCount)}
          <div className={paginationDiv}>
            <ul className={pagination}>
              <li className={`page-item ${pageIndex === 1 ? "disabled" : ""}`}>
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  <i className="mdi mdi-chevron-left"></i>
                </Link>
              </li>
              <li className={"page-item active"}>
                <Link to="#" className="page-link">
                  {pageIndex}
                </Link>
              </li>
              <li
                className={`page-item ${
                  pageIndex > pagination.pageCount ? "disabled" : ""
                }`}
              >
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  <i className="mdi mdi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer
