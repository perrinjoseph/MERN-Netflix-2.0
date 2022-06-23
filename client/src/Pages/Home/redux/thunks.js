import { nanoid } from "nanoid";
import axiosClient from "../../../Global/Api/axiosConfig";
import API_ENDPOINTS from "../../../Global/Api/api-endpoints";
import HOME_SCREEN_ACTIONS from "./actions";

export const getMovieListThunk =
  (genre, skip, limit, title) => async (dispatch, getState) => {
    const id = nanoid();
    const {
      homeScreen: {
        data: { sliders },
      },
    } = getState();

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
