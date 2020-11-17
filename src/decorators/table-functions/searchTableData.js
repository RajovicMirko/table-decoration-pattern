export function searchTableData(data, searchValue) {
  return data.filter((row) => {
    return Object.values(row).filter(
      (val) => val.toString().toLowerCase().indexOf(searchValue) !== -1
    ).length;
  });
}
