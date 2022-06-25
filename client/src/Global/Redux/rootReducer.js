import { combineReducers } from "redux";
import homeScreenReducer from "../../Pages/Home/redux/reducer";
import newMoviesReducer from "../../Pages/NewMovies/redux/reducer";
import searchPageReducer from "../../Pages/Search/redux/reducer";
import signUpReducer from "../../Pages/SignUp/redux/reducer";
import { API_STATUS } from "../Api/constants";
import moreInformationReducer from "../Components/MovieInformation/redux/reducer";
import GLOBAL_ACTIONS_TYPES from "./types";

/*
Reducers mentioned in here are not specific for components. Hence they are 
in this file. These states have a global-common nature, example:
User, Authentication, Api status's etc.
*/
const defaultUserState = {
  data: null,
  apiStatus: null,
  error: null,
  isAuthenticating: null,
};

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.AUTHENTICATE_USER_STARTED:
      return {
        ...state,
        isAuthenticating: API_STATUS.GETTING,
        data: null,
      };

    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: API_STATUS.SUCCESS,
        data: action.payload,
      };

    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.AUTHENTICATE_USER_ERROR:
      return {
        ...state,
        isAuthenticating: API_STATUS.ERROR,
        error: action.payload.error,
        data: null,
      };

    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGIN_USER_ERROR:
      return {
        ...state,
        apiStatus: API_STATUS.ERROR,
        error: action.payload,
      };

    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGIN_USER_STARTED:
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
        error: null,
        data: null,
      };

    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGIN_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        apiStatus: API_STATUS.SUCCESS,
      };

    case GLOBAL_ACTIONS_TYPES.USER_ACTION_TYPES.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        data: null,
      };

    default:
      return state;
  }
};

/**
 * This reducer controls state of the player on the screen. When the user hits play button
 * this reducer should set its openPlayer value to true and
 * the player window should popup on the screen.
 */
const mediaPlayerDefaultState = {
  data: { source: null, duration: null },
  openPlayer: false,
  error: null,
};

const mediaPlayerReducer = (state = mediaPlayerDefaultState, action) => {
  switch (action.type) {
    case GLOBAL_ACTIONS_TYPES.MEDIA_PLAYER_ACTION_TYPES.OPEN_MEDIA_PLAYER:
      return {
        ...state,
        openPlayer: true,
      };
    case GLOBAL_ACTIONS_TYPES.MEDIA_PLAYER_ACTION_TYPES.CLOSE_MEDIA_PLAYER:
      return {
        ...state,
        openPlayer: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  signUp: signUpReducer,
  mediaPlayer: mediaPlayerReducer,
  homeScreen: homeScreenReducer,
  movieMoreInfo: moreInformationReducer,
  newMovies: newMoviesReducer,
  search: searchPageReducer,
});
