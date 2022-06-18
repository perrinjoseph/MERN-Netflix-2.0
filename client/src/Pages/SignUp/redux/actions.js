import SIGNUP_ACTION_TYPES from "./types";

const changeSignUpActiveStep = (data) => ({
  type: SIGNUP_ACTION_TYPES.CHANGE_ACTIVE_STEP,
  payload: data,
});

const changeTermsAndConditionCheckbox = (data, id) => ({
  type: SIGNUP_ACTION_TYPES.CHANGE_TERMS_AND_CONDITION_CHECKBOX,
  payload: { data, id },
});

const changeStepStatus = (data, step) => ({
  type: SIGNUP_ACTION_TYPES.CHANGE_STEP_STATUS,
  payload: { data, step },
});

const changeInputField = (data, field) => ({
  type: SIGNUP_ACTION_TYPES.CHANGE_INPUT_FIELD,
  payload: { data, field },
});

const updateSignUpProgress = (data) => ({
  type: SIGNUP_ACTION_TYPES.UPDATE_SIGN_UP_PROGRESS,
  payload: data,
});

const verifyUserSignedUpStartedAction = () => ({
  type: SIGNUP_ACTION_TYPES.VERIFY_USER_EXISTS_STARTED,
});

const verifyUserSignedUpSuccessAction = (email) => ({
  type: SIGNUP_ACTION_TYPES.VERIFY_USER_EXISTS_SUCCESS,
  payload: { data: email },
});

const verifyUserSignedUpErrorAction = (error) => ({
  type: SIGNUP_ACTION_TYPES.VERIFY_USER_EXISTS_ERROR,
  payload: { error },
});

export const signUpActions = {
  updateSignUpProgress,
  changeInputField,
  changeStepStatus,
  changeSignUpActiveStep,
  changeTermsAndConditionCheckbox,
  verifyUserSignedUpStartedAction,
  verifyUserSignedUpSuccessAction,
  verifyUserSignedUpErrorAction,
};
