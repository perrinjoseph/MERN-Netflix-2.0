import API_ENDPOINTS from "../../../Api/api-endpoints";
import axiosClient from "../../../Api/axiosConfig";
import MOVIE_INFORMATION_ACTIONS from "./actions";

export const getMoreLikeThisListThunk =
  (genre, skip = 0, limit = 6, currentMovie) =>
  async (dispatch) => {
    dispatch(MOVIE_INFORMATION_ACTIONS.getMoreLikeThisStartedAction());
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
        MOVIE_INFORMATION_ACTIONS.getMoreLikeThisSuccessAction(response.data)
      );
    } catch (err) {
      dispatch(
        MOVIE_INFORMATION_ACTIONS.getMoreLikeThisErrorAction(err.data?.error)
      );
    }
  };
