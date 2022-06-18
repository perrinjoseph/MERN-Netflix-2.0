import { API_STATUS } from "../../../Global/Api/constants";
import { stepStatus } from "../../../Global/Components/HorizontalStepper/constant";
import SIGNUP_ACTION_TYPES from "./types";

const defaultState = {
  data: {
    email: "",
    region: "",
    password: "",
    confirmPassword: "",
    agreement: false,
    address: "",
    zipCode: "",
    state: "",
    TAC: { 1: false, 2: false, 3: false, 4: false },
    stepDetails: [
      {
        stepTitle: "Terms and Conditions",
        stepStatus: "",
      },
      {
        stepTitle: "Personal Information",
        stepStatus: "",
      },

      {
        stepTitle: "Payment Information",
        stepStatus: "",
      },
    ],
  },
  progress: stepStatus.INCOMPLETE,
  activeStep: 1,
  apiStatus: null,
  error: null,
};

const signUpReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SIGNUP_ACTION_TYPES.UPDATE_SIGN_UP_PROGRESS:
      return {
        ...state,
        progress: action.payload.data,
      };

    case SIGNUP_ACTION_TYPES.CHANGE_INPUT_FIELD:
      return {
        ...state,
        data: { ...state.data, [action.payload.field]: action.payload.data },
      };

    case SIGNUP_ACTION_TYPES.CHANGE_STEP_STATUS:
      return {
        ...state,
        data: {
          ...state.data,
          stepDetails: state.data.stepDetails.map((step) => {
            if (step.stepTitle === action.payload.step) {
              return {
                stepTitle: step.stepTitle,
                stepStatus: action.payload.data,
              };
            } else return step;
          }),
        },
      };

    case SIGNUP_ACTION_TYPES.CHANGE_TERMS_AND_CONDITION_CHECKBOX:
      return {
        ...state,
        data: {
          ...state.data,
          TAC: { ...state.data.TAC, [action.payload.id]: action.payload.data },
        },
      };

    case SIGNUP_ACTION_TYPES.CHANGE_ACTIVE_STEP:
      return { ...state, activeStep: action.payload };

    case SIGNUP_ACTION_TYPES.VERIFY_USER_EXISTS_STARTED:
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
        error: null,
      };

    case SIGNUP_ACTION_TYPES.VERIFY_USER_EXISTS_SUCCESS:
      return {
        ...state,
        data: { ...state.data, email: action.payload.data },
        apiStatus: API_STATUS.SUCCESS,
      };

    case SIGNUP_ACTION_TYPES.VERIFY_USER_EXISTS_ERROR:
      return {
        ...state,
        apiStatus: API_STATUS.ERROR,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default signUpReducer;
