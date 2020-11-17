import React from "react";

const trStyle = {
  backgroundColor: "red",
  color: "white",
};

const tdStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  padding: "0.5rem 0",
};

function NoResults({ colSpan, text }) {
  return (
    <tbody>
      <tr style={trStyle}>
        <td colSpan={colSpan} style={tdStyle}>
          {text}
        </td>
      </tr>
    </tbody>
  );
}

export default NoResults;
