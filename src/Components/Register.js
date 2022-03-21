import { useState } from "react";
import "./Register.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
    console.log(username, email, password);
  };
  return (
    <div className="registration-page">
      <div className="registration-card">
        <h1 className="registration-heading">Mark 2</h1>
        <h2>Sign Up!</h2>
        <form className="registration-form" onSubmit={submitHandler}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={usernameChangeHandler}
          />
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={emailChangeHandler}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <button type="submit">Sign Up</button>
          <p onClick={() => props.onPageChange("login")}>
            Already have an account? Sign In!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
