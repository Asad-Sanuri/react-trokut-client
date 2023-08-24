import React, { useState } from "react";
import "./Signin.css";

function Signin({ onRouteChange, loadUser }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("https://react-trokut-server.onrender.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter") {
      onSubmitSignIn();
    }
  };

  return (
    <article>
      <main>
        <div className="container">
          <fieldset id="sign_up">
            <legend>Sign In</legend>
            <div>
              <label htmlFor="email-address">Email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
                onKeyUp={handleKeyUp}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
                onKeyUp={handleKeyUp}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              id="SigninBtn"
              type="submit"
              value="Sign in"
            />
          </div>          
        </div>
      </main>
    </article>
  );
}

export default Signin;
