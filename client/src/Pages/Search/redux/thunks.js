import API_ENDPOINTS from "../../../Global/Api/api-endpoints";
import axiosClient from "../../../Global/Api/axiosConfig";
import SEARCH_MOVIES_ACTIONS from "./actions";

export const getSearchResultThunk = (search) => async (dispatch) => {
  dispatch(SEARCH_MOVIES_ACTIONS.searchMoviesStartedAction());
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.MOVIES.GET_SEARCH_MOVIES,
      {
        params: {
          search,
        },
      }
    );

    dispatch(SEARCH_MOVIES_ACTIONS.searchMoviesSuccessAction(response.data));
  } catch (error) {
    dispatch(SEARCH_MOVIES_ACTIONS.searchMoviesErrorAction(error));
  }
};
