import React, { useState } from "react";
import Button from "../../Global/Components/Button/Button";
import Center from "../../Global/Layouts/Center";
import Input from "../../Global/Components/Input/Input";
import Navbar from "../../Global/Components/Navbar/Navbar";
import { navbarTypes } from "../../Global/Components/Navbar/constants";

function SignUp() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: false });
  const handleOnSubmit = (e) => {
    e.preventDefault();
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
              handleOnChange={(value) => {
                setEmail(value);
                setErrors({ ...errors, email: !value });
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
