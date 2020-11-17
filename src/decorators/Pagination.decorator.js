import React, { Component } from "react";

const PaginationDecorator = () => (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);

      const {
        currentPage,
        rowsPerPage,
        rowsPerPageOptions,
        rowsCount,
      } = props.pagination;

      this.handleChange = props.handleUpdate;

      this.state = {
        currentPage,
        rowsPerPage,
        rowsPerPageOptions,
        dataFrom: 0,
        dataTo: rowsPerPage,
        rowsCount,
      };
    }

    handlePagination(state) {
      this.handleChange({ type: "pagination", data: state });
    }

    componentDidMount() {
      this.handlePagination(this.state);
    }

    get maxPage() {
      return Math.ceil(this.state.rowsCount / this.state.rowsPerPage);
    }

    get dataTo() {
      const { currentPage, rowsPerPage } = this.state;
      return currentPage * rowsPerPage;
    }

    get dataFrom() {
      return this.dataTo - this.state.rowsPerPage;
    }

    get fromText() {
      return this.dataFrom < this.state.rowsCount
        ? this.dataFrom + 1
        : this.state.rowsCount;
    }
    get toText() {
      return this.dataTo < this.state.rowsCount
        ? this.dataTo
        : this.state.rowsCount;
    }
    get ofText() {
      return this.state.rowsCount;
    }

    generatePaginationNumbersRule = () => {
      let result = [];
      const { currentPage } = this.state;
      const { maxPage } = this;

      if (maxPage <= 5) {
        // MAX FIVE NUMBERS
        result = Array.from({ length: maxPage }, (val, i) => i + 1);
      } else {
        // MORE THEN FIVE NUMBERS
        result = [1];
        if (currentPage > 3) result.push("dots1");
        if (currentPage + 1 < maxPage)
          result.push(currentPage - 1, currentPage, currentPage + 1);
        if (currentPage >= maxPage - 2) result.push(maxPage - 4, maxPage - 3);
        result.push("dots2");
        result.push(maxPage - 2, maxPage - 1, maxPage);
      }

      // remove duplicates
      return result
        .filter((val, i, arr) => arr.slice(i + 1).indexOf(val) === -1)
        .sort((a, b) => a - b);
    };

    goSelect = (e) => {
      const state = this.state;
      state.rowsPerPage = Number(e.target.value);
      state.currentPage = 1;
      state.dataFrom = this.dataFrom;
      state.dataTo = this.dataTo;
      // state.dataTo = state.rowsPerPage;
      this.handlePagination(state);
    };

    goPrevious = () => {
      const state = this.state;
      state.currentPage -= 1;
      state.dataFrom = this.dataFrom;
      state.dataTo = this.dataTo;
      this.handlePagination(state);
    };

    goNext = () => {
      const state = this.state;
      state.currentPage += 1;
      state.dataFrom = this.dataFrom;
      state.dataTo = this.dataTo;
      this.handlePagination(state);
    };

    goPage = (page) => {
      const state = this.state;
      state.currentPage = page;
      state.dataFrom = this.dataFrom;
      state.dataTo = this.dataTo;
      this.handlePagination(state);
    };

    render() {
      const passPropsToWrappedComponent = {
        ...this.props,
        pagination: {
          ...this.props.pagination,
          fromText: this.fromText,
          toText: this.toText,
          ofText: this.ofText,
          maxPage: this.maxPage,
          goSelect: this.goSelect,
          goPrevious: this.goPrevious,
          goPage: this.goPage,
          goNext: this.goNext,
          generatePaginationNumbersRule: this.generatePaginationNumbersRule,
        },
      };
      return <WrappedComponent {...passPropsToWrappedComponent} />;
    }
  };
};

export default PaginationDecorator;
