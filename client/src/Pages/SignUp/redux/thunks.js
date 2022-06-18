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
  } catch (error) {
    console.log(error);
    dispatch(signUpActions.verifyUserSignedUpErrorAction(error));
  }
};
