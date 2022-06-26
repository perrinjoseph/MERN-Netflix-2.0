const { API_STATUS } = require("../../../Global/Api/constants");
const { NEW_MOVIES_TYPES } = require("./types");

const newMoviesDefaultState = {
  apiStatus: null,
  data: [],
  error: null,
};

const newMoviesReducer = (state = newMoviesDefaultState, action) => {
  switch (action.type) {
    case NEW_MOVIES_TYPES.GET_NEW_MOVIES_STARTED:
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
        error: null,
      };

    case NEW_MOVIES_TYPES.GET_NEW_MOVIES_SUCCESS:
      return {
        ...state,
        apiStatus: API_STATUS.SUCCESS,
        data: action.payload.data,
      };

    case NEW_MOVIES_TYPES.GET_NEW_MOVIES_ERROR:
      return {
        ...state,
        apiStatus: API_STATUS.ERROR,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default newMoviesReducer;
