const { NEW_MOVIES_TYPES } = require("./types");

const getNewMoviesStartedAction = () => ({
  type: NEW_MOVIES_TYPES.GET_NEW_MOVIES_STARTED,
});
const getNewMoviesErrorAction = (error) => ({
  type: NEW_MOVIES_TYPES.GET_NEW_MOVIES_ERROR,
  payload: { error },
});
const getNewMoviesSuccessAction = (data) => ({
  type: NEW_MOVIES_TYPES.GET_NEW_MOVIES_SUCCESS,
  payload: { data },
});

const newMoviesAction = {
  getNewMoviesStartedAction,
  getNewMoviesErrorAction,
  getNewMoviesSuccessAction,
};
export default newMoviesAction;
