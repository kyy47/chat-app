import React from "react";
import "./error.css";
const Error = ({ message }) => {
  return <span className="error">{message}</span>;
};
export default Error;
