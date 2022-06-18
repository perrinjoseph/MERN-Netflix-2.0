import axiosClient from "../Api/axiosConfig";
import API_ENDPOINTS from "../Api/api-endpoints";
import GLOBAL_ACTIONS from "./actions";

export const loginUserThunk =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(GLOBAL_ACTIONS.loginUserStartedAction());
    let response;
    try {
      response = await axiosClient.post(API_ENDPOINTS.AUTH.POST_LOGIN, {
        email,
        password,
      });
      dispatch(GLOBAL_ACTIONS.loginUserSuccessAction(response.data));
      return true;
    } catch (err) {
      dispatch(GLOBAL_ACTIONS.loginUserErrorAction(err.data?.error));
      return false;
    }
  };

export const authenticateUserThunk = () => async (dispatch) => {
  dispatch(GLOBAL_ACTIONS.authenticateUserStartedAction());
  try {
    const response = await axiosClient.get(API_ENDPOINTS.AUTH.GET_AUTHENTICATE);
    dispatch(GLOBAL_ACTIONS.authenticateUserSuccessAction(response.data));
    return true;
  } catch (error) {
    dispatch(GLOBAL_ACTIONS.authenticateUserErrorAction(error?.data?.error));
    return false;
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  try {
    await axiosClient.post(API_ENDPOINTS.AUTH.POST_LOGOUT);
    dispatch(GLOBAL_ACTIONS.logoutUserSuccessAction());
  } catch (error) {
    dispatch(GLOBAL_ACTIONS.logoutUserSuccessAction());
  }
};
