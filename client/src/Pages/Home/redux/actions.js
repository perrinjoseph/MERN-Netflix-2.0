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

const HOME_SCREEN_ACTIONS = {
  getMovieListSuccessAction,
  getMovieListErrorAction,
  getMovieListStartedAction,
  getRandomMovieStartedAction,
  getRandomMovieErrorAction,
  getRandomMovieSuccessAction,
};

export default HOME_SCREEN_ACTIONS;
