const API_ENDPOINTS = {
  AUTH: {
    GET_AUTHENTICATE: "/auth/authenticate",
    POST_LOGIN: "/auth/login",
    POST_REGISTER: "/auth/register",
    POST_LOGOUT: "/auth/logout",
  },
  USERS: {
    GET_FIND_USER: "/users/find",
    GET_FIND_ALL_USERS: "/users/",
    GET_USER_STATS: "/users/stats",
    GET_MY_LIST: "/users/mylist/userid/",
    POST_VERIFY_USER_SIGNED_UP: "/users/find",
    PUT_UPDATE_USER: "/users/update/",
    PUT_ADD_TO_MY_LIST: "/users/mylist/userid",
    DELETE_USER: "/users/delete/",
    DELETE_FROM_MY_LIST: "/users/mylist/userid",
  },
  MOVIES: {
    GET_FIND_MOVIE: "/movies",
    GET_RANDOM_MOVIE: "/movies/random/banner",
    GET_MEDIA_ACCESS_LINK: "/movies/accessLink/media",
    GET_SEARCH_MOVIES: "/movies/search/movies/searchfor/",
    POST_MOVIE_SLIDER: "/movies/search/genre/skip/limit/",
    POST_CREATE_MOVIE: "/movies",
    PUT_UPDATE_MOVIE: "/movies",
    DELETE_MOVIE: "/movies/delete/file",
  },
};

export default API_ENDPOINTS;
