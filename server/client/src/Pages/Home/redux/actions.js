import HOME_SCREEN_ACTION_TYPES from "./types";

const getMovieListStartedAction = (id) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_MOVIES_LIST_STARTED,
  payload: {
    id,
  },
});

const getMovieListErrorAction = (id, error) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_MOVIES_LIST_ERROR,
  payload: {
    id,
    error,
  },
});

const getMovieListSuccessAction = (id, data, title) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_MOVIES_LIST_SUCCESS,
  payload: {
    id,
    data,
    title,
  },
});

const getRandomMovieStartedAction = () => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_RANDOM_MOVIE_STARTED,
});

const getRandomMovieErrorAction = (error) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_RANDOM_MOVIE_ERROR,
  payload: { error },
});

const getRandomMovieSuccessAction = (data) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_RANDOM_MOVIE_SUCCESS,
  payload: { data },
});

const getMyListStartedAction = () => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_MY_LIST_STARTED,
});

const getMyListSuccessAction = (data) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_MY_LIST_SUCCESS,
  payload: { data },
});

const getMyListErrorAction = (error) => ({
  type: HOME_SCREEN_ACTION_TYPES.GET_MY_LIST_ERROR,
  payload: { error },
});

const addToMyListSuccessAction = (data) => ({
  type: HOME_SCREEN_ACTION_TYPES.ADD_TO_MY_LIST_SUCCESS,
  payload: { data },
});

const addToMyListErrorAction = (movieIdToRemove, error) => ({
  type: HOME_SCREEN_ACTION_TYPES.ADD_TO_MY_LIST_ERROR,
  payload: { movieIdToRemove, error },
});

const deleteFromListSuccessAction = (movieIdToRemove) => ({
  type: HOME_SCREEN_ACTION_TYPES.DELETE_FROM_MY_LIST_SUCCESS,
  payload: { movieIdToRemove },
});

const deleteFromListErrorAction = (data, error) => ({
  type: HOME_SCREEN_ACTION_TYPES.DELETE_FROM_MY_LIST_ERROR,
  payload: { data, error },
});

const HOME_SCREEN_ACTIONS = {
  deleteFromListErrorAction,
  deleteFromListSuccessAction,
  addToMyListErrorAction,
  addToMyListSuccessAction,
  getMovieListSuccessAction,
  getMovieListErrorAction,
  getMovieListStartedAction,
  getRandomMovieStartedAction,
  getRandomMovieErrorAction,
  getRandomMovieSuccessAction,
  getMyListStartedAction,
  getMyListSuccessAction,
  getMyListErrorAction,
};

export default HOME_SCREEN_ACTIONS;
