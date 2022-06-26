import { MOVIE_INFORMATION_ACTION_TYPES } from "./types";

const getMoreLikeThisStartedAction = () => ({
  type: MOVIE_INFORMATION_ACTION_TYPES.GET_MORE_LIKE_THIS_STARTED,
});

const getMoreLikeThisSuccessAction = (data) => ({
  type: MOVIE_INFORMATION_ACTION_TYPES.GET_MORE_LIKE_THIS_SUCCESS,
  payload: { data },
});

const getMoreLikeThisErrorAction = (error) => ({
  type: MOVIE_INFORMATION_ACTION_TYPES.GET_MORE_LIKE_THIS_ERROR,
  payload: { error },
});

const setMoreInfoMovieAction = (data) => ({
  type: MOVIE_INFORMATION_ACTION_TYPES.SET_MORE_INFO_MOVIE,
  payload: { data },
});

const openMoreInfoAction = () => ({
  type: MOVIE_INFORMATION_ACTION_TYPES.OPEN_MORE_INFO,
});
const closeMoreInfoAction = () => ({
  type: MOVIE_INFORMATION_ACTION_TYPES.CLOSE_MORE_INFO,
});

const MOVIE_INFORMATION_ACTIONS = {
  getMoreLikeThisStartedAction,
  getMoreLikeThisSuccessAction,
  getMoreLikeThisErrorAction,
  setMoreInfoMovieAction,
  openMoreInfoAction,
  closeMoreInfoAction,
};

export default MOVIE_INFORMATION_ACTIONS;
