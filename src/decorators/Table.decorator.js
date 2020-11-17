import React from "react";
import { pipe } from "../helpers/js";

import {
  handleStateChangeByPayload,
  handleSearch,
  handlePagination,
  handleSort,
} from "./table-functions/tableCore";

const TableDecorator = () => (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: props.data,
        filteredData: [],
        searchValue: "",
        sortConfig: {
          lastKey: null,
          sortAsc: null, // true for asc, false for desc
        },
        pagination: {
          currentPage: 1,
          rowsPerPage: 10,
          rowsPerPageOptions: [3, 5, 10, 20, 50, 100],
          rowsCount: props.data.length,
        },
      };
    }

    handleTableChange = (payload) => {
      const newState = pipe(
        handleStateChangeByPayload,
        handleSearch,
        handlePagination,
        handleSort
      )(this.state, payload);

      this.setState({ ...newState });
    };

    render() {
      const passPropsToWrappedComponent = {
        ...this.props,
        data: this.state.filteredData,
        pagination: this.state.pagination,
        handleUpdate: this.handleTableChange,
      };

      return <WrappedComponent {...passPropsToWrappedComponent} />;
    }
  };
};

export default TableDecorator;
