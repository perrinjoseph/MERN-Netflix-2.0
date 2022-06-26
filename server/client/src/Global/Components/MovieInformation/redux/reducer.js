import { API_STATUS } from "../../../Api/constants";
import { MOVIE_INFORMATION_ACTION_TYPES } from "./types";

const moreInformationDefaultState = {
  open: false,
  data: {
    movie: {},
    moreLikeThis: [{}, {}, {}, {}, {}, {}],
  },
  apiStatus: null,
  error: null,
};

const moreInformationReducer = (
  state = moreInformationDefaultState,
  action
) => {
  switch (action.type) {
    case MOVIE_INFORMATION_ACTION_TYPES.GET_MORE_LIKE_THIS_STARTED:
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
        data: { ...state.data, moreLikeThis: [{}, {}, {}, {}, {}, {}] },
      };
    case MOVIE_INFORMATION_ACTION_TYPES.GET_MORE_LIKE_THIS_SUCCESS:
      return {
        ...state,
        data: { ...state.data, moreLikeThis: action.payload.data },
        apiStatus: API_STATUS.SUCCESS,
      };
    case MOVIE_INFORMATION_ACTION_TYPES.GET_MORE_LIKE_THIS_ERROR:
      return {
        ...state,
        apiStatus: API_STATUS.ERROR,
        error: action.payload.error,
      };

    case MOVIE_INFORMATION_ACTION_TYPES.SET_MORE_INFO_MOVIE:
      return {
        ...state,
        data: { ...state.data, movie: action.payload.data },
      };

    case MOVIE_INFORMATION_ACTION_TYPES.OPEN_MORE_INFO:
      return {
        ...state,
        open: true,
      };

    case MOVIE_INFORMATION_ACTION_TYPES.CLOSE_MORE_INFO:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default moreInformationReducer;
