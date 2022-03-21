import { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
    console.log(username, password);
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-heading">Mark 2</h1>
        <h2>Sign In!</h2>
        <form className="login-form" onSubmit={submitHandler}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={usernameChangeHandler}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <button type="submit">Login</button>
          <p onClick={() => props.onPageChange("register")}>
            Don't have an account? Sign Up!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
