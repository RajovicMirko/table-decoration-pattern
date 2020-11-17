export function sortTableByColumn(sortConfig, data) {
  let newData = Object.assign([], data);
  const { sortAsc, lastKey } = sortConfig;
  return bubbleSortArrayOfObjects(sortAsc, lastKey, newData);
}

const test = (direction, valA, valB) => {
  return direction ? valA > valB : valA < valB;
};

const bubbleSortArrayOfObjects = (direction, key, arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let change = false;

    for (let j = 0; j < arr.length - (i + 1); j++) {
      if (test(direction, arr[j][key], arr[j + 1][key])) {
        change = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }

    if (!change) break;
  }

  return arr;
};
