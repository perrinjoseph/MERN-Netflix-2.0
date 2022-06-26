import GLOBAL_ACTIONS_TYPES from "./types";

const openMediaPlayerAction = (trailer) => ({
  type: GLOBAL_ACTIONS_TYPES.MEDIA_PLAYER_ACTION_TYPES.OPEN_MEDIA_PLAYER,
  payload: { data: trailer },
});

const closeMediaPlayerAction = () => ({
  type: GLOBAL_ACTIONS_TYPES.MEDIA_PLAYER_ACTION_TYPES.CLOSE_MEDIA_PLAYER,
});

const loginUserSuccessAction = (user) => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGIN_USER_SUCCESS,
  payload: user,
});

const loginUserStartedAction = () => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGIN_USER_STARTED,
});

const loginUserErrorAction = (error) => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGIN_USER_ERROR,
  payload: error,
});

const authenticateUserStartedAction = () => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.AUTHENTICATE_USER_STARTED,
});

const authenticateUserSuccessAction = (userInformation) => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.AUTHENTICATE_USER_SUCCESS,
  payload: userInformation,
});

const authenticateUserErrorAction = () => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.AUTHENTICATE_USER_ERROR,
});

const logoutUserSuccessAction = () => ({
  type: GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGOUT_USER_SUCCESS,
});

const showAlert = (alertType, alertMessage) => ({
  type: GLOBAL_ACTIONS_TYPES.ALERT_ACTION_TYPES.SHOW_ALERT,
  payload: { alertType, alertMessage },
});

const hideAlert = () => ({
  type: GLOBAL_ACTIONS_TYPES.ALERT_ACTION_TYPES.HIDE_ALERT,
});

const GLOBAL_ACTIONS = {
  openMediaPlayerAction,
  closeMediaPlayerAction,
  loginUserSuccessAction,
  loginUserStartedAction,
  loginUserErrorAction,
  authenticateUserStartedAction,
  authenticateUserSuccessAction,
  authenticateUserErrorAction,
  logoutUserSuccessAction,
  showAlert,
  hideAlert,
};

export default GLOBAL_ACTIONS;
