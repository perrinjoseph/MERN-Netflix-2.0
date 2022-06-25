import { API_STATUS } from "../../../Global/Api/constants";
import { SEARCH_MOVIES_ACTION_TYPES } from "./types";

const searchPageDefaultState = {
  apiStatus: null,
  data: [],
  error: null,
};

const searchPageReducer = (state = searchPageDefaultState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES_ACTION_TYPES.SEARCH_MOVIES_STARTED:
      //kept state as is on purpose so the screen does not go blank.
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
      };

    case SEARCH_MOVIES_ACTION_TYPES.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        apiStatus: API_STATUS.SUCCESS,
        data: action.payload.data,
      };

    case SEARCH_MOVIES_ACTION_TYPES.SEARCH_MOVIES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        apiStatus: API_STATUS.ERROR,
      };
    default:
      return state;
  }
};

export default searchPageReducer;
