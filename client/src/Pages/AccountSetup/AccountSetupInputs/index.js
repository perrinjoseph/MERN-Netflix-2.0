import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { INPUT_TYPES } from "../../../Global/Constants/constant";

//TODO:isChecked can be removed and default input can be used for all inputs.
//Rename defaultInput to defaultValue
function AccountSetupInputs({
  type,
  placeholder,
  title,
  options,
  handleOnClick,
  isChecked,
  defaultInput,
  handleOnChange,
  error,
}) {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setChecked(isChecked);
    setInputValue(defaultInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (type) {
    case INPUT_TYPES.CREDIT_CARD_SECURITY_CODE:
      return (
        <div className="account-setup-inputs">
          <label className="account-setup-inputs--label" htmlFor={placeholder}>
            {title}
          </label>
          <input
            readOnly
            value={"415"}
            className="account-setup-inputs--default"
            placeholder={placeholder}
            id={placeholder}
          />

          <span
            className={`GLOBAL-errors-message account-signup-errormsg hide--errormsg ${
              error && "show--errormsg"
            }`}
          >
            {error}
          </span>
        </div>
      );
    case INPUT_TYPES.CREDIT_CARD_DATE:
      return (
        <div className="account-setup-inputs">
          <label className="account-setup-inputs--label" htmlFor={placeholder}>
            {title}
          </label>
          <input
            readOnly
            value={"12/22"}
            className="account-setup-inputs--default"
            placeholder={placeholder}
            id={placeholder}
          />

          <span
            className={`GLOBAL-errors-message account-signup-errormsg hide--errormsg ${
              error && "show--errormsg"
            }`}
          >
            {error}
          </span>
        </div>
      );
    case INPUT_TYPES.CREDIT_CARD_NUMBER:
      return (
        <div className="account-setup-inputs">
          <label className="account-setup-inputs--label" htmlFor={placeholder}>
            {title}
          </label>
          <input
            readOnly
            value={"5342 8475 7534 0431"}
            className="account-setup-inputs--default"
            placeholder={placeholder}
            id={placeholder}
          />

          <span
            className={`GLOBAL-errors-message account-signup-errormsg hide--errormsg ${
              error && "show--errormsg"
            }`}
          >
            {error}
          </span>
        </div>
      );
    case INPUT_TYPES.CHECK_BOX:
      return (
        <div className="account-setup-inputs account-setup-inputs--checkbox">
          <div
            className={`account-setup-inputs--checkbox--checkBoxBg${
              checked ? "--checked" : ""
            }`}
            onClick={() => {
              if (handleOnClick) handleOnClick(!checked);
              setChecked(!checked);
            }}
          >
            {checked && (
              <FiCheck color="white" fontSize="12px" strokeWidth={2} />
            )}
          </div>
          <label
            className="account-setup-inputs--label account-setup-inputs--checkbox-label"
            htmlFor={placeholder}
          >
            {title}
          </label>
        </div>
      );

    case INPUT_TYPES.PASSWORD:
      return (
        <div className="account-setup-inputs">
          <label className="account-setup-inputs--label" htmlFor={placeholder}>
            {title}
          </label>
          <input
            autoComplete="on"
            onChange={(e) => {
              setInputValue(e.target.value);
              handleOnChange(e.target.value);
            }}
            value={inputValue}
            className="account-setup-inputs--default"
            placeholder={placeholder}
            id={placeholder}
            type="password"
          />

          <span
            className={`GLOBAL-errors-message account-signup-errormsg hide--errormsg ${
              error && "show--errormsg"
            }`}
          >
            {error}
          </span>
        </div>
      );

    case INPUT_TYPES.DROP_DOWN:
      return (
        <div className="account-setup-inputs">
          <label htmlFor={placeholder} className="account-setup-inputs--label">
            {title}
          </label>
          <br />
          <select
            name={placeholder}
            id={placeholder}
            className="account-setup-inputs--default"
            value={defaultInput}
            onChange={(e) => {
              handleOnChange(e.target.value);
              setInputValue(e.target.value);
            }}
          >
            {options.map((region, index) => (
              <option key={`${region}-${index}`} value={region}>
                {region}
              </option>
            ))}
          </select>

          <span
            className={`GLOBAL-errors-message account-signup-errormsg hide--errormsg ${
              error && "show--errormsg"
            }`}
          >
            {error}
          </span>
        </div>
      );

    default:
      return (
        <div className="account-setup-inputs">
          <label className="account-setup-inputs--label" htmlFor={placeholder}>
            {title}
          </label>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleOnChange(e.target.value);
            }}
            className="account-setup-inputs--default"
            placeholder={placeholder}
            id={placeholder}
          />

          <span
            className={`GLOBAL-errors-message account-signup-errormsg hide--errormsg ${
              error && "show--errormsg"
            }`}
          >
            {error}
          </span>
        </div>
      );
  }
}

export default AccountSetupInputs;
