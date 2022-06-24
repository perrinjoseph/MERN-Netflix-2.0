import API_ENDPOINTS from "../../../Global/Api/api-endpoints";
import axiosClient from "../../../Global/Api/axiosConfig";
import newMoviesAction from "./actions";

export const getNewMoviesThunk = () => async (dispatch) => {
  dispatch(newMoviesAction.getNewMoviesStartedAction());
  try {
    const response = await axiosClient.post(
      `${API_ENDPOINTS.MOVIES.POST_MOVIE_SLIDER}`,
      {},
      {
        params: { newMovies: true },
      }
    );
    dispatch(newMoviesAction.getNewMoviesSuccessAction(response.data));
  } catch (error) {
    dispatch(newMoviesAction.getNewMoviesErrorAction(error));
  }
};
