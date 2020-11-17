import React from "react";

const Input = (props) => {
  const { placeholder, onChange } = props;

  return (
    <input
      placeholder={placeholder}
      onChange={(event) =>
        onChange({ type: "search", data: event.target.value })
      }
    />
  );
};

export default Input;
