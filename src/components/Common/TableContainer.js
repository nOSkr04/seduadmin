import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table"
import { Table, Row } from "reactstrap"
import { Link } from "react-router-dom"

// Define a default UI for filtering

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  GlobalFilter,
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
                <span className="fw-semibold">{paginations.total}</span> аас{" "}
                <span className="fw-semibold">{data.length}</span> харагдаж
                байна
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
