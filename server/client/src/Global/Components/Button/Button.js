import React from "react";
import { buttonTypes } from "./constants";

function Button({ type, title, enabled = true, ...props }) {
  switch (type) {
    case buttonTypes.SECONDARY_FILLED:
      return (
        <button className="button--secondary-filled" {...props}>
          {title}
        </button>
      );
    case buttonTypes.SIMPLE:
      return (
        <button
          disabled={!enabled}
          className={`button--simple ${
            enabled ? "" : "button--simple-disabled"
          }`}
          {...props}
        >
          {title}
        </button>
      );
    case buttonTypes.SECONDARY:
      return (
        <button className="button--secondary" {...props}>
          {title}
        </button>
      );
    case buttonTypes.PRIMARY:
      return (
        <button className="button--primary" {...props}>
          {title}
        </button>
      );
    default:
      return (
        <button className="button--default" {...props}>
          {title}
        </button>
      );
  }
}

export default Button;
