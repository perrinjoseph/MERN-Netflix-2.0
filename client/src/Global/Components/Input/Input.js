import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const Input = ({ placeholder, invalid, handleOnChange, ...props }) => {
  return (
    <div className="input">
      <input
        onChange={(e) => handleOnChange(e.target.value)}
        className="input--field"
        placeholder={placeholder}
        {...props}
      ></input>
      {invalid && <FiAlertCircle className="warningIcon" size={"22px"} />}
      {invalid && (
        <span className="input--error-message">
          Email is required to continue
        </span>
      )}
    </div>
  );
};

export default Input;
