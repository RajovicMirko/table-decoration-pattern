import { sortTableByColumn } from "./sortTableByColumn";
import { searchTableData } from "./searchTableData";
/**
 *
 * @payload { type: string, data: any} payload is object and has two attributes
 *    @type {string} - valid values ["search", "pagination", "sort"]
 *    @data {any} - valid values [ "searchString", "paginationObject", "columnIdString"]
 */

export const handleStateChangeByPayload = ([state, payload = null]) => {
  if (!payload) return state;
  const { type, data } = payload;
  switch (type) {
    case "search":
      state.searchValue = data;
      break;
    case "pagination":
      state.pagination = data;
      break;
    case "sort":
      state.sortConfig.sortAsc =
        state.sortConfig.lastKey === data ? !state.sortConfig.sortAsc : true;
      state.sortConfig.lastKey = data;
      break;
  }

  return state;
};

export const handleSearch = (state) => {
  if (state.searchValue) {
    state.filteredData = searchTableData(state.data, state.searchValue);
  } else {
    state.filteredData = state.data;
  }
  return state;
};

export const handlePagination = (state) => {
  const { dataFrom, dataTo } = state.pagination;
  state.pagination.rowsCount = state.filteredData.length;
  state.filteredData = state.filteredData.slice(dataFrom, dataTo);
  return state;
};

export const handleSort = (state) => {
  state.filteredData = sortTableByColumn(state.sortConfig, state.filteredData);
  return state;
};
