import React from "react";

const Body = ({ data }) => {
  const bodyElements = data.map((row) => {
    return (
      <tr key={row.id}>
        {Object.values(row).map((item) => (
          <td key={item}>{item}</td>
        ))}
      </tr>
    );
  });

  return <tbody>{bodyElements}</tbody>;
};

export default Body;
