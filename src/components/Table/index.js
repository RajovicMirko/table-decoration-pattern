import "./table.css";
import React, { Component, Fragment, lazy } from "react";
import TableDecorator from "../../decorators/Table.decorator";
import PaginationDecorator from "../../decorators/Pagination.decorator";

const Banner = lazy(() => import("../Banner"));
const Input = lazy(() => import("../Input"));
const Pagination = lazy(() => import("../Pagination"));
const Header = lazy(() => import("./Header"));
const Body = lazy(() => import("./Body"));
const NoResults = lazy(() => import("./NoResults"));

@TableDecorator()
@PaginationDecorator()
class Table extends Component {
  render() {
    const { title, headers, data, pagination, handleUpdate } = this.props;
    const columnsCount = Object.keys(headers).length;

    return (
      <div className="table-wrapper">
        <Banner text={title} className="table-banner">
          <Input placeholder="Search" onChange={handleUpdate} />
        </Banner>
        <table>
          <Header headers={headers} onClick={handleUpdate} />
          {!!data.length && <Body data={data} />}

          {!data.length && (
            <NoResults colSpan={columnsCount} text="No results found" />
          )}
        </table>
        <Pagination
          className="table-pagination"
          {...pagination}
          handleChange={handleUpdate}
        />
      </div>
    );
  }
}

export default Table;
