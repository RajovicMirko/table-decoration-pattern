import React from "react";

const Header = (props) => {
  const { headers, onClick, ...rest } = props;

  const headersElements = (
    <tr>
      {Object.keys(headers).map((key) => {
        return (
          <th
            key={key}
            id={key}
            onClick={(event) =>
              onClick({ type: "sort", data: event.target.id })
            }
          >
            {headers[key]}
          </th>
        );
      })}
    </tr>
  );

  return <thead {...rest}>{headersElements}</thead>;
};

export default Header;
