import API_ENDPOINTS from "../../../Global/Api/api-endpoints";
import axiosClient from "../../../Global/Api/axiosConfig";
import { signUpActions } from "./actions";

export const verifyUserSignedUpThunk = (email) => async (dispatch) => {
  dispatch(signUpActions.verifyUserSignedUpStartedAction());
  try {
    await axiosClient.post(API_ENDPOINTS.USERS.POST_VERIFY_USER_SIGNED_UP, {
      email,
    });
    dispatch(signUpActions.verifyUserSignedUpSuccessAction(email));
    return true;
  } catch (error) {
    dispatch(signUpActions.verifyUserSignedUpErrorAction(error));
    return false;
  }
};

export const createUserAccountThunk = (email, password) => async (dispatch) => {
  dispatch(signUpActions.createAccountStartedAction());
  try {
    await axiosClient.post(API_ENDPOINTS.AUTH.POST_REGISTER, {
      email,
      password,
    });
    dispatch(signUpActions.createAccountSuccessAction());
    return true;
  } catch (error) {
    dispatch(signUpActions.createAccountErrorAction(error));
    return false;
  }
};
