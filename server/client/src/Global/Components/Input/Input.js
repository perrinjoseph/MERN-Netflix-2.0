import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const Input = ({
  placeholder,
  invalid,
  handleOnChange,
  errorMessage,
  ...props
}) => {
  return (
    <div className="input">
      <input
        onChange={(e) => handleOnChange(e.target.value)}
        className="input--field"
        placeholder={placeholder}
        {...props}
      ></input>
      {invalid && <FiAlertCircle className="warningIcon" size={"22px"} />}
      {invalid && <div className="input--error-message">{errorMessage}</div>}
    </div>
  );
};

export default Input;
