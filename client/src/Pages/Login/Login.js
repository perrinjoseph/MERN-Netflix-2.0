import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../Global/Components/Button/Button";
import { buttonTypes } from "../../Global/Components/Button/constants";
import Center from "../../Global/Layouts/Center";
import { loginUserThunk } from "../../Global/Redux/thunks";
import { RiErrorWarningFill } from "react-icons/ri";
import { API_STATUS } from "../../Global/Api/constants";
import Navbar from "../../Global/Components/Navbar/Navbar";
import { navbarTypes } from "../../Global/Components/Navbar/constants";

function Login() {
  const { apiStatus, errorMessage, data } = useSelector(
    ({ user: { apiStatus, error, data } }) => ({
      apiStatus,
      errorMessage: error,
      data,
    })
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) setErrors({ ...errors, email: null });
    else setErrors({ ...errors, email: "Required Field" });
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) setErrors({ ...errors, password: null });
    else setErrors({ ...errors, password: "Required Field" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      await dispatch(loginUserThunk({ email, password }));
    } else {
      setErrors({
        ...errors,
        email: !!email ? "" : "Required Field",
        password: !!password ? "" : "Required Field",
      });
    }
  };

  return (
    <main className="login-page">
      <Navbar type={navbarTypes.LOGIN} />
      <Center>
        <section className="login-page--container">
          <form onSubmit={handleOnSubmit}>
            <h2>Sign In</h2>

            <input
              className={`login-page--container--inputs ${
                errors.email && "GLOBAL-input-errorborder"
              }`}
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChangeEmail}
              autoComplete="true"
            ></input>
            <span className="GLOBAL-errors-message">{errors.email}</span>

            <input
              className={`login-page--container--inputs ${
                errors.password && "GLOBAL-input-errorborder"
              }`}
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="true"
              onChange={handleChangePassword}
              value={password}
            ></input>
            <span className="GLOBAL-errors-message">{errors.password}</span>
            {apiStatus === API_STATUS.ERROR && (
              <div className="GLOBAL-errors-message">
                <RiErrorWarningFill size={20} /> {errorMessage}
              </div>
            )}
            <div className="signin-btn">
              <Button
                onClick={handleOnSubmit}
                title="Sign In"
                type={buttonTypes.PRIMARY}
              ></Button>
            </div>
          </form>
          <footer className="login-page--container--footer">
            New to Netflix?{" "}
            <Link to="/" className="link-styles-reset link-blue">
              Sign up now.
            </Link>
            <br />
            <p className="login-page--container--footer--notice">
              This clone of Netflix is made for education use only. Login uses
              JWT. Click to Learn More about the tech stack.
            </p>
          </footer>
        </section>
      </Center>
    </main>
  );
}

export default Login;
