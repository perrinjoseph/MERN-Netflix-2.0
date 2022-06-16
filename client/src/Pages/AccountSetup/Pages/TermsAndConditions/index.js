import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../Global/Components/Button/Button";
import { buttonTypes } from "../../../../Global/Components/Button/constants";
import { stepStatus } from "../../../../Global/Components/HorizontalStepper/constant";
import { INPUT_TYPES } from "../../../../Global/Constants/constant";
import { signUpActions } from "../../../SignUp/redux/actions";
import AccountSetupInputs from "../../AccountSetupInputs";
import { REGIONS, STEPS } from "../../constants";

function TermsAndConditions() {
  const dispatch = useDispatch();
  const { TAC, activeStep } = useSelector(
    ({
      signUp: {
        data: { TAC },
        activeStep,
      },
    }) => ({ TAC, activeStep })
  );

  const handleOnClick = (value, id) => {
    dispatch(signUpActions.changeTermsAndConditionCheckbox(value, id));
  };

  useEffect(() => {
    if (Object.values(TAC).every((term) => term === true))
      dispatch(
        signUpActions.changeStepStatus(
          stepStatus.COMPLETED,
          STEPS.TERMS_AND_CONDITIONS
        )
      );
    else
      dispatch(
        signUpActions.changeStepStatus(
          stepStatus.INCOMPLETE,
          STEPS.TERMS_AND_CONDITIONS
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TAC]);

  return (
    <div className="stepForm-container">
      <header className="stepForm-container--header">
        <h3 className="stepForm-container--header--title">
          Terms and Conditions
        </h3>
        <div className="stepForm-container--header--subheader">
          Please read and accept our terms and conditions. This form needs to be
          completed to proceed.<br></br>
          <AccountSetupInputs
            type={INPUT_TYPES.CHECK_BOX}
            title={
              <span className="account-setup-inputs--checkbox-label">
                I understand that my information may not be protected as this is
                an educational project.
              </span>
            }
            isChecked={TAC[1]}
            handleOnClick={(value) => handleOnClick(value, 1)}
            options={REGIONS}
          />
          <AccountSetupInputs
            type={INPUT_TYPES.CHECK_BOX}
            title={
              <span className="account-setup-inputs--checkbox-label">
                I understand that giving my personal information, such as, but
                not limited to: credit card number, phone number, name etc could
                be leaked or stolen because of a security breach.
              </span>
            }
            isChecked={TAC[2]}
            handleOnClick={(value) => handleOnClick(value, 2)}
            options={REGIONS}
          />
          <AccountSetupInputs
            type={INPUT_TYPES.CHECK_BOX}
            title={
              <span className="account-setup-inputs--checkbox-label">
                I understand that all the information provided is not accurate
                and the developer may use this data in any way they intend.
              </span>
            }
            isChecked={TAC[3]}
            handleOnClick={(value) => handleOnClick(value, 3)}
            options={REGIONS}
          />
          <AccountSetupInputs
            type={INPUT_TYPES.CHECK_BOX}
            title={
              <span className="account-setup-inputs--checkbox-label">
                I understand that the payment section uses a fully working API,
                therefore, providing my payment information may lead to a charge
                on my account.
              </span>
            }
            isChecked={TAC[4]}
            handleOnClick={(value) => handleOnClick(value, 4)}
            options={REGIONS}
          />
        </div>
      </header>
      <form className="stepForm-container--form">
        <span className="account-setup-inputs--checkbox-label">
          If you wish to support the developer, please{" "}
          <span className="clickable-links">Click Here. </span>
          Do not use the payment page for contributions.
        </span>
      </form>
      <footer>
        <Button
          enabled={Object.values(TAC).every((term) => term === true)}
          title="Proceed"
          type={buttonTypes.SIMPLE}
          onClick={() =>
            dispatch(signUpActions.changeSignUpActiveStep(activeStep + 1))
          }
        />
      </footer>
    </div>
  );
}

export default TermsAndConditions;
