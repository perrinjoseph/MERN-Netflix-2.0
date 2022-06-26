import React from "react";
import { ALERT_TYPES } from "./constants";
import { FaCheck } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdInformationCircle } from "react-icons/io";
import { colors } from "../../../Styles/colors";
import { motion } from "framer-motion";

function Alert({ type, message }) {
  switch (type) {
    case ALERT_TYPES.SUCCESS:
      return (
        <motion.div
          initial={{ y: "100px" }}
          animate={{ y: "-70px" }}
          exit={{ y: "100px" }}
          transition={{ duration: 0.4 }}
          className="alert alert-success"
        >
          <FaCheck
            className="alert--icon alert--icon-success"
            size={30}
            color={colors.green.primary}
          />
          <div className="alert--message alert--message-success">{message}</div>
        </motion.div>
      );

    case ALERT_TYPES.ERROR:
      return (
        <motion.div
          initial={{ y: "100px" }}
          animate={{ y: "-70px" }}
          exit={{ y: "100px" }}
          transition={{ duration: 0.4 }}
          className="alert alert-error"
        >
          <RiErrorWarningFill
            className="alert--icon alert--icon-error"
            size={40}
            color="red"
          />
          <div className="alert--message alert--message-error">{message}</div>
        </motion.div>
      );
    case ALERT_TYPES.WARNING:
      return (
        <motion.div
          initial={{ y: "100px" }}
          animate={{ y: "-70px" }}
          exit={{ y: "100px" }}
          transition={{ duration: 0.4 }}
          className="alert alert-warning"
        >
          <RiErrorWarningFill
            className="alert--icon alert--icon-warning"
            size={40}
            color="orange"
          />
          <div className="alert--message alert--message-warning">{message}</div>
        </motion.div>
      );
    case ALERT_TYPES.INFO:
      return (
        <motion.div
          initial={{ y: "100px" }}
          animate={{ y: "-70px" }}
          exit={{ y: "100px" }}
          transition={{ duration: 0.4 }}
          className="alert alert-info"
        >
          <IoMdInformationCircle
            className="alert--icon alert--icon-info"
            size={40}
            color={colors.blue.secondary}
          />
          <div className="alert--message alert--message-info">{message}</div>
        </motion.div>
      );
    default:
      return null;
  }
}

export default Alert;
