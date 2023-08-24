import React, { useState } from "react";
import "./Register.css";

function Register({ loadUser, onRouteChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitRegister = () => {
    fetch("https://react-trokut-server.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
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
      onSubmitRegister();
    }
  };

  return (
    <article>
      <main>
        <div className="container">
          <fieldset id="sign_up">
            <legend>Register</legend>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
                onKeyUp={handleKeyUp}
              />
            </div>
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
          <div>
            <input onClick={onSubmitRegister} type="submit" value="Register" />
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;
