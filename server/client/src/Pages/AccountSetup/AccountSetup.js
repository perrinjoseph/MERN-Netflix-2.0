import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Global/Components/Button/Button";
import { buttonTypes } from "../../Global/Components/Button/constants";
import HorizontalStepper from "../../Global/Components/HorizontalStepper/HorizontalStepper";
import { navbarTypes } from "../../Global/Components/Navbar/constants";
import Navbar from "../../Global/Components/Navbar/Navbar";
import Center from "../../Global/Layouts/Center";
import { colors } from "../../Styles/colors";
import { signUpActions } from "../SignUp/redux/actions";
import PaymentInformation from "./Pages/PaymentInformation";
import PersonalInformation from "./Pages/PersonalInformation";
import TermsAndConditions from "./Pages/TermsAndConditions";

function AccountSetup() {
  const dispatch = useDispatch();
  const { activeStep, stepDetails } = useSelector(
    ({
      signUp: {
        activeStep,
        data: { stepDetails },
      },
    }) => ({
      activeStep,
      stepDetails,
    })
  );

  const handleNextButton = () => {
    if (activeStep < 3)
      dispatch(signUpActions.changeSignUpActiveStep(activeStep + 1));
  };
  const handleBackButton = () => {
    if (activeStep > 1)
      dispatch(signUpActions.changeSignUpActiveStep(activeStep + -1));
  };

  useEffect(() => {
    dispatch(signUpActions.resetCreateAccountError());
    const bodyTag = document.getElementsByTagName("body")[0];
    bodyTag.style.backgroundColor = colors.light.bgColor;
    return () => (bodyTag.style.backgroundColor = colors.dark.bgColor);
  }, []);

  return (
    <main className="account-setup">
      <Navbar type={navbarTypes.ACCOUNT_SETUP} />
      <Center>
        <div className="account-setup--horizontal-stepper">
          <HorizontalStepper
            activeStep={activeStep}
            stepDetails={stepDetails}
            getActiveStep={(activeStep) =>
              dispatch(signUpActions.changeSignUpActiveStep(activeStep))
            }
          />
        </div>

        {activeStep === 1 && <TermsAndConditions />}
        {activeStep === 2 && <PersonalInformation />}
        {activeStep === 3 && <PaymentInformation />}
        <section className="account-setup--stepper-btns">
          <Button
            title="Back"
            type={buttonTypes.SIMPLE}
            onClick={handleBackButton}
          ></Button>
          <span className="account-setup--stepper-btns--counter">
            Step {activeStep} of 3
          </span>
          <Button
            title="Next"
            type={buttonTypes.SIMPLE}
            onClick={handleNextButton}
          ></Button>
        </section>
      </Center>
    </main>
  );
}

export default AccountSetup;
