import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../../Global/Components/Button/Button";
import { buttonTypes } from "../../../../Global/Components/Button/constants";
import { stepStatus } from "../../../../Global/Components/HorizontalStepper/constant";
import { INPUT_TYPES } from "../../../../Global/Constants/constant";
import { signUpActions } from "../../../SignUp/redux/actions";
import { createUserAccountThunk } from "../../../SignUp/redux/thunks";
import AccountSetupInputs from "../../AccountSetupInputs";
import { STEPS } from "../../constants";

function PaymentInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { zipCode, state, address, stepDetails, email, password } = useSelector(
    ({
      signUp: {
        data: { zipCode, state, address, stepDetails, email, password },
        apiStatus,
        error,
      },
    }) => ({
      zipCode,
      state,
      address,
      stepDetails,
      apiStatus,
      email,
      password,
      error: error?.data?.error,
    })
  );

  const handlePayButtonClick = async () => {
    if (stepDetails.every((step) => step.stepStatus === stepStatus.COMPLETED)) {
      dispatch(signUpActions.updateSignUpProgress(stepStatus.COMPLETED));
      const response = await dispatch(createUserAccountThunk(email, password));
      if (!response) dispatch(signUpActions.changeSignUpActiveStep(2));
      if (response) {
        navigate("/login", { replace: true });
        dispatch(signUpActions.resetSignUpAction());
      }
    } else {
      const incompleteStep = stepDetails.find(
        (step) =>
          step.stepStatus === stepStatus.INCOMPLETE || step.stepStatus === ""
      );
      dispatch(
        signUpActions.changeStepStatus(
          stepStatus.INCOMPLETE,
          incompleteStep.stepTitle
        )
      );
      dispatch(signUpActions.changeSignUpActiveStep(incompleteStep.stepId));
      dispatch(signUpActions.updateSignUpProgress(stepStatus.INCOMPLETE));
    }
  };

  useEffect(() => {
    if (zipCode && state && address)
      dispatch(
        signUpActions.changeStepStatus(
          stepStatus.COMPLETED,
          STEPS.PAYMENT_INFORMATION
        )
      );
    else
      dispatch(signUpActions.changeStepStatus("", STEPS.PAYMENT_INFORMATION));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode, state, address]);

  return (
    <div className="stepForm-container">
      <header className="stepForm-container--header">
        <h3 className="stepForm-container--header--title">
          Payment Information
        </h3>
        <p className="stepForm-container--header--subheader">
          For your security all field have been prefilled with mock data and
          will be disabled. Entering real payment details may result in a
          charge.
          <br />
        </p>
      </header>
      <form className="stepForm-container--form">
        <AccountSetupInputs
          type={INPUT_TYPES.CREDIT_CARD_NUMBER}
          placeholder="Card Number"
          title="Credit Card Number"
        />
        <section className="stepForm-container--form--row">
          <div className="stepForm-container--form--col">
            <AccountSetupInputs
              placeholder="Expiry Date"
              title="Expiry Date"
              type={INPUT_TYPES.CREDIT_CARD_DATE}
            />
          </div>
          <div className="stepForm-container--form--col">
            <AccountSetupInputs
              placeholder="CSV"
              title="CSV"
              type={INPUT_TYPES.CREDIT_CARD_SECURITY_CODE}
            />
          </div>
        </section>
        <AccountSetupInputs
          disabled={true}
          placeholder="Address"
          title="Address"
          defaultInput={address}
          handleOnChange={(value) =>
            dispatch(signUpActions.changeInputField(value, "address"))
          }
        />
        <section className="stepForm-container--form--row">
          <div className="stepForm-container--form--col">
            <AccountSetupInputs
              disabled={true}
              placeholder="Zip Code"
              title="Zip Code"
              defaultInput={zipCode}
              handleOnChange={(value) =>
                dispatch(signUpActions.changeInputField(value, "zipCode"))
              }
            />
          </div>
          <div className="stepForm-container--form--col">
            <AccountSetupInputs
              disabled={true}
              placeholder="State"
              title="State"
              defaultInput={state}
              handleOnChange={(value) =>
                dispatch(signUpActions.changeInputField(value, "state"))
              }
            />
          </div>
        </section>
      </form>
      <footer>
        <Button
          onClick={handlePayButtonClick}
          enabled={[zipCode, state, address].every((question) => question)}
          title="Pay"
          type={buttonTypes.SIMPLE}
        />
      </footer>
    </div>
  );
}

export default PaymentInformation;
