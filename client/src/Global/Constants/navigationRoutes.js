import { lazy } from "react";
import AccountSetup from "../../Pages/AccountSetup/AccountSetup";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import { navbarTypes } from "../Components/Navbar/constants";
import Navbar from "../Components/Navbar/Navbar";

//Lazy loaded components
const Home = lazy(() => import("../../Pages/Home"));

export const ROUTE_SECURITY_TYPES = {
  PROTECTED: "protected",
  NONE: "none",
};

/**
 * NOTE: Account setup is not set as a protected route because for now
 * the architecture has not been built yet.
 * This page is a secure payment page that will use both UI and backend verification for
 * authenticating that the user has started creating an account.
 * This may change in the future. This page might just be an
 * accessible page for users to create an account.
 */
const routes = [
  {
    path: "/",
    name: "Sign Up",
    component: <SignUp />,
    security: ROUTE_SECURITY_TYPES.NONE,
    navbar: navbarTypes.SIGN_UP,
  },
  {
    path: "login",
    name: "Login",
    component: <Login />,
    security: ROUTE_SECURITY_TYPES.NONE,
    navbar: navbarTypes.LOGIN,
  },
  {
    path: "home",
    name: "Home",
    component: <Home />,
    security: ROUTE_SECURITY_TYPES.PROTECTED,
    navbar: navbarTypes.HOME_SCREEN,
  },
  {
    path: "tvshows",
    name: "TV Shows",
    component: null,
    security: ROUTE_SECURITY_TYPES.PROTECTED,
    navbar: navbarTypes.HOME_SCREEN,
  },
  {
    path: "movies",
    name: "Movies",
    component: null,
    security: ROUTE_SECURITY_TYPES.PROTECTED,
    navbar: navbarTypes.HOME_SCREEN,
  },
  {
    path: "new",
    name: "New",
    component: null,
    security: ROUTE_SECURITY_TYPES.PROTECTED,
    navbar: navbarTypes.HOME_SCREEN,
  },
  {
    path: "mylist",
    name: "My List",
    component: null,
    security: ROUTE_SECURITY_TYPES.PROTECTED,
    navbar: navbarTypes.HOME_SCREEN,
  },
  {
    path: "accountsetup",
    name: "Account Setup",
    component: <AccountSetup />,
    security: ROUTE_SECURITY_TYPES.NONE,
    navbar: navbarTypes.ACCOUNT_SETUP,
  },
];

export default routes;
