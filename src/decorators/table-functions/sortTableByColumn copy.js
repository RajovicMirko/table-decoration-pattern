const sortText = (sortAsc, valA, valB) => {
  if (valA < valB) return sortAsc ? -1 : 1;
  if (valA > valB) return sortAsc ? 1 : -1;
  return 0;
};

const sortNumbersBooleans = (sortAsc, valA, valB) => {
  return sortAsc ? valA - valB : valB - valA;
};

export function sortTableByColumn(sortConfig, data) {
  let newData = Object.assign([], data);
  const { sortAsc, lastKey: key } = sortConfig;

  newData.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    const tryParseValue = Number(valA);

    return isNaN(tryParseValue)
      ? sortText(sortAsc, valA, valB)
      : sortNumbersBooleans(sortAsc, valA, valB);
  });

  return newData;
}
