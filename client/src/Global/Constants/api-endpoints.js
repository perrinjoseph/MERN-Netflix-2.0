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
    PUT_UPDATE_UPSER: "/users/update/",
    DELETE_USER: "/users/delete/",
  },
  MOVIES: {
    GET_FIND_MOVIE: "/movies",
    GET_RANDOM_MOVIE: "/movies/random/banner",
    GET_MEDIA_ACCESS_LINK: "/movies/accessLink/media",
    POST_MOVIE_SLIDER: "/movies/search/genre/skip/limit/",
    POST_CREATE_MOVIE: "/movies",
    PUT_UPDATE_MOVIE: "/movies",
    DELETE_MOVIE: "/movies/delete/file",
  },
};

export default API_ENDPOINTS;
