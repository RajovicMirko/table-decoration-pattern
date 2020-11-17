import React from "react";

const Banner = (props) => {
  const { type, text, children, ...rest } = props;

  return (
    <div {...rest}>
      <span>{text}</span>
      {children && children}
    </div>
  );
};

export default Banner;
