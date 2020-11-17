import { findByText } from "@testing-library/react";

export const pipe = (...fns) => (...arg) => {
  return fns.reduce((acc, fn) => fn(acc), arg);
};
