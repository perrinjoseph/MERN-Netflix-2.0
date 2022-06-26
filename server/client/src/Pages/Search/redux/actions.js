import { SEARCH_MOVIES_ACTION_TYPES } from "./types";

const searchMoviesErrorAction = (error) => ({
  type: SEARCH_MOVIES_ACTION_TYPES.SEARCH_MOVIES_ERROR,
  payload: { error },
});

const searchMoviesSuccessAction = (data) => ({
  type: SEARCH_MOVIES_ACTION_TYPES.SEARCH_MOVIES_SUCCESS,
  payload: { data },
});

const searchMoviesStartedAction = () => ({
  type: SEARCH_MOVIES_ACTION_TYPES.SEARCH_MOVIES_STARTED,
});

const SEARCH_MOVIES_ACTIONS = {
  searchMoviesErrorAction,
  searchMoviesSuccessAction,
  searchMoviesStartedAction,
};

export default SEARCH_MOVIES_ACTIONS;
