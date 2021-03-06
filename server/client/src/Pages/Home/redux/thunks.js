import { nanoid } from "nanoid";
import axiosClient from "../../../Global/Api/axiosConfig";
import API_ENDPOINTS from "../../../Global/Api/api-endpoints";
import HOME_SCREEN_ACTIONS from "./actions";
import { showGlobalAlert } from "../../../Global/Redux/thunks";
import { ALERT_TYPES } from "../../../Global/Components/Alert/constants";

export const getMovieListThunk =
  (genre, skip, limit, title) => async (dispatch, getState) => {
    const id = nanoid();
    dispatch(HOME_SCREEN_ACTIONS.getMovieListStartedAction(id));
    try {
      const response = await axiosClient.post(
        `${API_ENDPOINTS.MOVIES.POST_MOVIE_SLIDER}`,
        {},
        {
          params: {
            genre,
            skip,
            limit,
          },
        }
      );

      dispatch(
        HOME_SCREEN_ACTIONS.getMovieListSuccessAction(id, response.data, title)
      );
    } catch (err) {
      dispatch(HOME_SCREEN_ACTIONS.getMovieListErrorAction(id, err.data.error));
      return false;
    }
  };

export const getRandomMovieThunk = () => async (dispatch) => {
  dispatch(HOME_SCREEN_ACTIONS.getRandomMovieStartedAction());
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.MOVIES.GET_RANDOM_MOVIE
    );
    dispatch(HOME_SCREEN_ACTIONS.getRandomMovieSuccessAction(response.data[0]));
  } catch (error) {
    dispatch(HOME_SCREEN_ACTIONS.getRandomMovieErrorAction(error.data.error));
  }
};

export const getMyListThunk = () => async (dispatch, getState) => {
  const {
    user: {
      data: { _id },
    },
  } = getState();

  dispatch(HOME_SCREEN_ACTIONS.getMyListStartedAction());
  try {
    const response = await axiosClient.get(
      `${API_ENDPOINTS.USERS.GET_MY_LIST}${_id}`
    );
    dispatch(HOME_SCREEN_ACTIONS.getMyListSuccessAction(response.data));
  } catch (err) {
    dispatch(HOME_SCREEN_ACTIONS.getMyListErrorAction(err));
  }
};

export const addToMyListThunk = (movie) => async (dispatch, getState) => {
  const {
    user: {
      data: { _id },
    },
    homeScreen: {
      data: { myList },
    },
  } = getState();

  if (
    !myList.find((eachMovie) => eachMovie._id === movie._id) &&
    myList.length < 5
  ) {
    dispatch(showGlobalAlert(ALERT_TYPES.SUCCESS, "Added to your list.", 3000));
    dispatch(HOME_SCREEN_ACTIONS.addToMyListSuccessAction(movie));
    try {
      await axiosClient.put(`${API_ENDPOINTS.USERS.GET_MY_LIST}${_id}`, {
        movieId: movie._id,
      });
    } catch (err) {
      dispatch(
        showGlobalAlert(ALERT_TYPES.ERROR, "Could not add to your list.", 3000)
      );
      dispatch(HOME_SCREEN_ACTIONS.addToMyListErrorAction(movie._id, err));
    }
  } else
    dispatch(
      showGlobalAlert(ALERT_TYPES.WARNING, "Only 5 movies can be added", 3000)
    );
};

export const deleteFromMyListThunk = (movie) => async (dispatch, getState) => {
  const {
    user: {
      data: { _id },
    },
  } = getState();
  dispatch(
    showGlobalAlert(ALERT_TYPES.SUCCESS, "Removed from your list.", 3000)
  );
  dispatch(HOME_SCREEN_ACTIONS.deleteFromListSuccessAction(movie._id));
  try {
    await axiosClient.delete(`${API_ENDPOINTS.USERS.GET_MY_LIST}${_id}`, {
      data: { movieId: movie._id },
    });
  } catch (err) {
    dispatch(
      showGlobalAlert(
        ALERT_TYPES.ERROR,
        "Could not removed from your list.",
        3000
      )
    );
    dispatch(HOME_SCREEN_ACTIONS.deleteFromListErrorAction(movie, err));
  }
};
