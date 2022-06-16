import React, { Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Global/Components/Navbar/Navbar";
import Watch from "./Pages/Watch";
import { useSelector } from "react-redux";
import routes, {
  ROUTE_SECURITY_TYPES,
} from "./Global/Constants/navigationRoutes";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { nanoid } from "nanoid";
import FallbackLoadingScreen from "./Global/Components/FallbackLoadingScreen";
import { FALLBACK_SCREEN_TYPES } from "./Global/Components/FallbackLoadingScreen/constants";
import useAuthentication from "./Global/Hooks/useAuthentication";
import { navbarTypes } from "./Global/Components/Navbar/constants";
import useAxiosInterceptors from "./Global/Hooks/useAxiosInterceptors";
import Footer from "./Global/Components/Footer";

function App() {
  const navigate = useNavigate();
  useAxiosInterceptors(navigate);
  const [isLoading] = useAuthentication();
  const { openPlayer, data } = useSelector(
    ({ mediaPlayer: { openPlayer }, user: { data } }) => ({
      openPlayer,
      data,
    })
  );

  return (
    <div className="App">
      {isLoading && (
        <FallbackLoadingScreen type={FALLBACK_SCREEN_TYPES.APP_LOADING} />
      )}
      {!isLoading && (
        <Routes>
          {routes.map((route) => (
            <Route
              key={nanoid(5)}
              path={route.path}
              element={
                <React.Fragment>
                  {route.security === ROUTE_SECURITY_TYPES.PROTECTED ? (
                    <ProtectedRoute>
                      <Suspense
                        fallback={
                          <FallbackLoadingScreen
                            type={FALLBACK_SCREEN_TYPES.APP_LOADING}
                          />
                        }
                      >
                        <Navbar type={route.navbar} />
                        <Navbar type={navbarTypes.MOBILE_HOME} />
                        {route.component}
                        <Footer />
                      </Suspense>

                      {openPlayer && <Watch />}
                    </ProtectedRoute>
                  ) : (
                    <>
                      <Navbar type={route.navbar} />
                      {route.component}
                      {openPlayer && <Watch />}
                      <Footer />
                    </>
                  )}
                </React.Fragment>
              }
            />
          ))}
        </Routes>
      )}
    </div>
  );
}

export default App;
