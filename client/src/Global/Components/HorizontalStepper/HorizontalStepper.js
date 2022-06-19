import React, { useEffect, useState } from "react";
import { stepStatus } from "./constant";
import Step from "./Step";

/**
 * @param {object} stepDetails - [{stepTitle: string, stepStatus: string}]
 * @param {function} getActiveStep - Will return the step that is currently in progress.
 */
function HorizontalStepper({ stepDetails = [], getActiveStep, activeStep }) {
  const [inProgress, setInProgress] = useState(activeStep);

  useEffect(() => {
    if (getActiveStep) getActiveStep(inProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress]);

  useEffect(() => {
    setInProgress(activeStep);
  }, [activeStep]);

  return (
    <article className="horizontal-stepper">
      {stepDetails.length >= 2 &&
        stepDetails.map((step, index, arr) => {
          if (index !== arr.length - 1)
            return (
              <React.Fragment key={`${step}-${index}`}>
                <Step
                  status={
                    inProgress === index + 1 &&
                    step.stepStatus !== stepStatus.COMPLETED
                      ? stepStatus.IN_PROGRESS
                      : step.stepStatus
                  }
                  title={step.stepTitle}
                  onClick={() => setInProgress(index + 1)}
                  selected={inProgress === index + 1}
                />
                <div
                  className={`horizontal-stepper--progressBar-${
                    step.stepStatus ? step.stepStatus : "Incomplete"
                  }`}
                />
              </React.Fragment>
            );
          else return null;
        })}
      <Step
        status={
          inProgress === stepDetails.length &&
          stepDetails[stepDetails.length - 1].stepStatus !==
            stepStatus.COMPLETED
            ? stepStatus.IN_PROGRESS
            : stepDetails[stepDetails.length - 1].stepStatus
        }
        title={stepDetails[stepDetails.length - 1].stepTitle}
        onClick={() => setInProgress(stepDetails.length)}
        selected={inProgress === stepDetails.length}
      />
    </article>
  );
}

export default HorizontalStepper;
