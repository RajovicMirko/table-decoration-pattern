import React, { Component, lazy } from "react";

const Select = lazy(() => import("./Select"));
const Button = lazy(() => import("./Button"));

class Pagination extends Component {
  render() {
    const {
      currentPage,
      maxPage,
      fromText,
      toText,
      ofText,
      rowsPerPage,
      rowsPerPageOptions,
      goSelect,
      goPrevious,
      goPage,
      goNext,
      generatePaginationNumbersRule,
    } = this.props;

    if (!fromText) return null;

    return (
      <div key="pagination" className="pagination-wrapper">
        <div className="pagination-left">
          <Select
            rowsPerPage={rowsPerPage}
            options={rowsPerPageOptions}
            onSelect={goSelect}
          />
          <small>
            Showing {fromText} to {toText} of {ofText} results
          </small>
        </div>

        <ul>
          {currentPage > 1 && (
            <Button
              key="previous"
              currentPage={currentPage}
              onClick={goPrevious}
              text="Previous"
            />
          )}

          {generatePaginationNumbersRule().map((page) => {
            switch (typeof page) {
              case "number":
                return (
                  <Button
                    key={page}
                    currentPage={currentPage}
                    page={page}
                    text={page}
                    onClick={goPage}
                  />
                );
              case "object":
                return page;
              case "string":
                return (
                  <Button
                    key={page}
                    currentPage={currentPage}
                    disabled
                    text="..."
                  />
                );
              default:
                return null;
            }
          })}

          {currentPage < maxPage && (
            <Button
              key="next"
              currentPage={currentPage}
              onClick={goNext}
              text="Next"
            />
          )}
        </ul>
      </div>
    );
  }
}

export default Pagination;
