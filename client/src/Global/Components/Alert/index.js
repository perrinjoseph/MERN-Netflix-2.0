import React from "react";
import { ALERT_TYPES } from "./constants";
import { FaCheck, FaInfo } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdInformationCircle } from "react-icons/io";
import { colors } from "../../../Styles/colors";

function Alert({ type }) {
  switch (type) {
    case ALERT_TYPES.SUCCESS:
      return (
        <div className="alert alert-success">
          <FaCheck
            className="alert--icon alert--icon-success"
            size={30}
            color={colors.green.primary}
          />
          <div className="alert--message alert--message-success">
            Added to list and this
          </div>
        </div>
      );

    case ALERT_TYPES.ERROR:
      return (
        <div className="alert alert-error">
          <RiErrorWarningFill
            className="alert--icon alert--icon-error"
            size={40}
            color="red"
          />
          <div className="alert--message alert--message-error">
            Failed to fetch data from server
          </div>
        </div>
      );
    case ALERT_TYPES.WARNING:
      return (
        <div className="alert alert-warning">
          <RiErrorWarningFill
            className="alert--icon alert--icon-warning"
            size={40}
            color="orange"
          />
          <div className="alert--message alert--message-warning">
            Only Admins can view this page
          </div>
        </div>
      );
    case ALERT_TYPES.INFO:
      return (
        <div className="alert alert-info">
          <IoMdInformationCircle
            className="alert--icon alert--icon-info"
            size={40}
            color={colors.blue.secondary}
          />
          <div className="alert--message alert--message-info">
            You can only add 5 movies to your list
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default Alert;
