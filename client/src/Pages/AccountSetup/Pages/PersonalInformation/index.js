import React, { useEffect, useState } from "react";
import { INPUT_TYPES } from "../../../../Global/Constants/constant";
import { REGIONS, STEPS } from "../../constants";
import AccountSetupInputs from "../../AccountSetupInputs";
import Button from "../../../../Global/Components/Button/Button";
import { buttonTypes } from "../../../../Global/Components/Button/constants";
import { useDispatch, useSelector } from "react-redux";
import { signUpActions } from "../../../SignUp/redux/actions";
import { stepStatus } from "../../../../Global/Components/HorizontalStepper/constant";

function PersonalInformation() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    region: "",
    tos: "",
  });
  const { email, password, confirmPassword, region, agreement, activeStep } =
    useSelector(
      ({
        signUp: {
          data: { email, password, confirmPassword, region, agreement },
          activeStep,
        },
      }) => ({
        email,
        password,
        confirmPassword,
        region,
        agreement,
        activeStep,
      })
    );

  useEffect(() => {
    if (email && password && confirmPassword && region && agreement)
      dispatch(
        signUpActions.changeStepStatus(
          stepStatus.COMPLETED,
          STEPS.PERSONAL_INFORMATION
        )
      );
    else
      dispatch(signUpActions.changeStepStatus("", STEPS.PERSONAL_INFORMATION));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, confirmPassword, region, agreement]);

  return (
    <div className="stepForm-container">
      <header className="stepForm-container--header">
        <h3 className="stepForm-container--header--title">
          Personal Information
        </h3>
        <p className="stepForm-container--header--subheader">
          These credentials will be needed for all users accessing this account.
          You can always reset your password or change your user name later.
        </p>
      </header>
      <form className="stepForm-container--form">
        <AccountSetupInputs
          error={errors.email}
          placeholder="Email"
          title="Email"
          handleOnChange={(value) => {
            dispatch(signUpActions.changeInputField(value, "email"));
            setErrors({ ...errors, email: !value ? "Required Field" : "" });
          }}
          defaultInput={email}
        />
        <section className="stepForm-container--form--row">
          <div className="stepForm-container--form--col">
            <AccountSetupInputs
              error={errors.password}
              handleOnChange={(value) => {
                dispatch(signUpActions.changeInputField(value, "password"));
                setErrors({
                  ...errors,
                  password: !value ? "Required Field" : "",
                });
              }}
              defaultInput={password}
              placeholder="Password"
              title="Password"
              type={INPUT_TYPES.PASSWORD}
            />
          </div>
          <div className="stepForm-container--form--col">
            <AccountSetupInputs
              error={errors.confirmPassword}
              handleOnChange={(value) => {
                dispatch(
                  signUpActions.changeInputField(value, "confirmPassword")
                );
                setErrors({
                  ...errors,
                  confirmPassword: !value
                    ? "Required Field"
                    : value === password
                    ? ""
                    : "Password must match",
                });
              }}
              defaultInput={confirmPassword}
              placeholder="Confirm Password"
              title="Confirm Password"
              type={INPUT_TYPES.PASSWORD}
            />
          </div>
        </section>
        <AccountSetupInputs
          type={INPUT_TYPES.DROP_DOWN}
          title={"Regions"}
          options={REGIONS}
          defaultInput={region}
          handleOnChange={(value) =>
            dispatch(signUpActions.changeInputField(value, "region"))
          }
        />
        <AccountSetupInputs
          type={INPUT_TYPES.CHECK_BOX}
          title={
            <span className="account-setup-inputs--checkbox-label">
              I understand and agree to the{" "}
              <span
                className="clickable-links"
                onClick={() => {
                  dispatch(signUpActions.changeSignUpActiveStep(1));
                }}
              >
                terms and conditions
              </span>
            </span>
          }
          options={REGIONS}
          isChecked={agreement}
          handleOnClick={(value) =>
            dispatch(signUpActions.changeInputField(value, "agreement"))
          }
        />
      </form>
      <footer>
        <Button
          enabled={[email, password, confirmPassword, region, agreement].every(
            (question) => question
          )}
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

export default PersonalInformation;
