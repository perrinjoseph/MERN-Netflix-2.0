import { useRef } from "react";
import { FiCheck } from "react-icons/fi";
import { stepStatus } from "./constant";

function Step({ status, title, onClick, selected }) {
  const stepStyle = useRef({ outer: "", inner: "" });

  switch (status) {
    case stepStatus.COMPLETED:
      stepStyle.current.outer = "step-status-completed";
      stepStyle.current.inner = "step-status-completed";
      break;

    case stepStatus.INCOMPLETE:
      stepStyle.current.outer = "";
      stepStyle.current.inner = "";
      break;

    case stepStatus.IN_PROGRESS:
      stepStyle.current.outer = "step-status-inProgress";
      stepStyle.current.inner = "step-status-inProgress";
      break;

    default:
      stepStyle.current.outer = "";
      stepStyle.current.inner = "";
  }

  return (
    <article onClick={onClick} className={`step ${stepStyle.current.outer}`}>
      {status !== stepStatus.COMPLETED && (
        <article className={`step--inner ${stepStyle.current.inner}`}></article>
      )}
      {status === stepStatus.COMPLETED && (
        <FiCheck color="white" fontSize="12px" strokeWidth={4} />
      )}
      <header
        className={`step--title --${status} ${
          selected ? `--${stepStatus.IN_PROGRESS}` : ""
        }`}
      >
        {title}
      </header>
    </article>
  );
}

export default Step;
