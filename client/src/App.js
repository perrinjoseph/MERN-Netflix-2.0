import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Alert from "./Global/Components/Alert";
import { ALERT_TYPES } from "./Global/Components/Alert/constants";
import FallbackLoadingScreen from "./Global/Components/FallbackLoadingScreen";
import { FALLBACK_SCREEN_TYPES } from "./Global/Components/FallbackLoadingScreen/constants";
import useAuthentication from "./Global/Hooks/useAuthentication";
import useAxiosInterceptors from "./Global/Hooks/useAxiosInterceptors";
import AccountSetup from "./Pages/AccountSetup/AccountSetup";
import Login from "./Pages/Login/Login";
import MyList from "./Pages/MyList";
import NewMovies from "./Pages/NewMovies";
import Popular from "./Pages/Popular";
import Search from "./Pages/Search";
import SignUp from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./Router/ProtectedRoute";
import PublicRoute from "./Router/PublicRoute";
//Lazy loading home component
const Home = lazy(() => import("./Pages/Home"));

function NewApp() {
  useAxiosInterceptors();
  const [isLoading] = useAuthentication();

  /*
  custom navbars for Signup and login page are put inside the components themselves
  because it would not make sense to create nested routes for them just to create 
  a common header component. They are unique anyways for the login 
  and the sign up page. 
  */
  return (
    <div className="App">
      <Alert type={ALERT_TYPES.ERROR} />
      {isLoading && (
        <FallbackLoadingScreen type={FALLBACK_SCREEN_TYPES.APP_LOADING} />
      )}
      {!isLoading && (
        <Suspense
          fallback={
            <FallbackLoadingScreen type={FALLBACK_SCREEN_TYPES.APP_LOADING} />
          }
        >
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/accountsetup" element={<AccountSetup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/new" element={<NewMovies />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default NewApp;
