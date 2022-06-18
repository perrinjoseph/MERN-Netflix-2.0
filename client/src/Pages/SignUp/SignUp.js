import React, { useState } from "react";
import Button from "../../Global/Components/Button/Button";
import Center from "../../Global/Layouts/Center";
import Input from "../../Global/Components/Input/Input";
import Navbar from "../../Global/Components/Navbar/Navbar";
import { verifyUserSignedUpThunk } from "./redux/thunks";
import { navbarTypes } from "../../Global/Components/Navbar/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: false });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && email.match(emailRegex)) {
      try {
        const response = await dispatch(verifyUserSignedUpThunk(email));
        if (response) {
          setErrors({
            ...errors,
            email: "",
          });
          navigate("/accountsetup");
        } else throw new Error("An account with this email already exists.");
      } catch (error) {
        setErrors({
          ...errors,
          email: error.message,
        });
      }
    } else {
      setErrors({
        ...errors,
        email: "Email id is invalid.",
      });
    }
  };

  return (
    <main className="signup">
      <Navbar type={navbarTypes.SIGN_UP} />
      <Center>
        <form onSubmit={handleOnSubmit} className="signup--form">
          <h1 className="signup--form--header">
            Unlimited movies, TV
            <br /> shows, and more.
          </h1>
          <h2 className="signup--form--subheading">
            Watch anywhere. Cancel anytime.
          </h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <br></br>
          <div className="signup--form--inputs">
            <Input
              name="email"
              placeholder="Email"
              invalid={errors.email}
              errorMessage={errors.email}
              handleOnChange={(value) => {
                setEmail(value);
                setErrors({
                  ...errors,
                  email: !value ? "Email is required to continue." : "",
                });
              }}
            />
            <div>
              <Button onClick={handleOnSubmit} title={"Submit"}></Button>
            </div>
          </div>
        </form>
      </Center>
    </main>
  );
}

export default SignUp;
