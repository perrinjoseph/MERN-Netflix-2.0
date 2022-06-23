import { API_STATUS } from "../../../Global/Api/constants";
import HOME_SCREEN_ACTION_TYPES from "./types";

const defaultHomeScreenState = {
  data: {
    myList: [],
    sliders: [],
    bannerMovie: { data: {}, apiStatus: null, error: null },
  },
  apiStatus: null,
  error: null,
};

const sliderDefaultState = {
  id: null,
  movies: [],
  apiStatus: null,
  title: null,
};

const homeScreenReducer = (state = defaultHomeScreenState, action) => {
  switch (action.type) {
    case HOME_SCREEN_ACTION_TYPES.GET_MOVIES_LIST_STARTED:
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
        data: {
          ...state.data,
          sliders: [
            ...state.data.sliders,
            {
              ...sliderDefaultState,
              apiStatus: API_STATUS.GETTING,
              id: action.payload.id,
            },
          ],
        },
        error: null,
      };

    case HOME_SCREEN_ACTION_TYPES.GET_MOVIES_LIST_ERROR:
      return {
        ...state,
        apiStatus: API_STATUS.ERROR,
        error: action.payload.error,
        data: {
          ...state.data,
          sliders: state.data.sliders.filter(
            (slider) => slider.id !== action.payload.id
          ),
        },
      };

    case HOME_SCREEN_ACTION_TYPES.GET_MOVIES_LIST_SUCCESS:
      return {
        ...state,
        apiStatus: API_STATUS.SUCCESS,
        data: {
          ...state.data,
          sliders: state.data.sliders.map((eachSlider) => {
            if (eachSlider.id === action.payload.id) {
              return {
                ...eachSlider,
                movies: action.payload.data,
                apiStatus: API_STATUS.SUCCESS,
                title: action.payload.title,
              };
            }
            return eachSlider;
          }),
        },
      };

    case HOME_SCREEN_ACTION_TYPES.GET_RANDOM_MOVIE_STARTED:
      return {
        ...state,
        data: {
          ...state.data,
          bannerMovie: {
            ...state.data.bannerMovie,
            apiStatus: API_STATUS.GETTING,
            error: null,
            data: null,
          },
        },
      };

    case HOME_SCREEN_ACTION_TYPES.GET_RANDOM_MOVIE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          bannerMovie: {
            ...state.data.bannerMovie,
            apiStatus: API_STATUS.SUCCESS,
            data: action.payload.data,
          },
        },
      };

    case HOME_SCREEN_ACTION_TYPES.GET_RANDOM_MOVIE_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          bannerMovie: {
            ...state.data.bannerMovie,
            apiStatus: API_STATUS.ERROR,
            error: action.payload.error,
          },
        },
      };

    case HOME_SCREEN_ACTION_TYPES.GET_MY_LIST_STARTED:
      return {
        ...state,
        apiStatus: API_STATUS.GETTING,
        error: null,
      };

    case HOME_SCREEN_ACTION_TYPES.GET_MY_LIST_SUCCESS:
      return {
        ...state,
        apiStatus: API_STATUS.SUCCESS,
        data: { ...state.data, myList: action.payload.data },
      };

    case HOME_SCREEN_ACTION_TYPES.GET_MY_LIST_ERROR:
      return {
        ...state,
        apiStatus: API_STATUS.ERROR,
        error: action.payload.error,
      };

    case HOME_SCREEN_ACTION_TYPES.ADD_TO_MY_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          myList: [...state.data.myList, action.payload.data],
        },
      };

    case HOME_SCREEN_ACTION_TYPES.ADD_TO_MY_LIST_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          myList: state.data.myList.filter(
            (movie) => movie._id !== action.payload.movieIdToRemove
          ),
        },
      };

    case HOME_SCREEN_ACTION_TYPES.DELETE_FROM_MY_LIST_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          myList: [...state.data.myList, action.payload.data],
        },
      };

    case HOME_SCREEN_ACTION_TYPES.DELETE_FROM_MY_LIST_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          myList: state.data.myList.filter(
            (movie) => movie._id !== action.payload.movieIdToRemove
          ),
        },
      };

    default:
      return state;
  }
};

export default homeScreenReducer;
