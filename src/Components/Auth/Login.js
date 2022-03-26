import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
    setError(false);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(username, password);
    fetch("https://mark-2-convo.herokuapp.com/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "Success") {
          console.log(result);
          localStorage.setItem("username", username);
          localStorage.setItem("id", result.data.userId);
          localStorage.setItem("token", result.data.token);
          setLoading(false);
          navigate("/chat");
        } else {
          setError(true);
          setLoading(false);
          setUsername("");
          setPassword("");
        }
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/chat");
    }
  });
  return (
    <div className="login-page">
      {loading && <Loader />}
      <div className="login-card">
        <h1 className="login-heading">Mark 2</h1>
        <h2>Sign In!</h2>
        {error ? "Authentication Failed" : null}
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
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
          <p onClick={() => props.onPageChange("register")}>
            Don't have an account? Sign Up!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
