import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./Register.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usernameChangeHandler = (event) => {
    setError(false);
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
    setLoading(true);
    console.log(username, email, password);
    fetch("http://127.0.0.1:3001/api/v1/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Success") {
          localStorage.setItem("username", username);
          localStorage.setItem("token", result.data.token);
          setLoading(false);
          navigate("/chat");
        } else {
          setError(true);
          setUsername("");
          setEmail("");
          setPassword("");
          setLoading(false);
        }
      });
  };
  return (
    <div className="registration-page">
      {loading && <Loader />}
      <div className="registration-card">
        <h1 className="registration-heading">Mark 2</h1>
        <h2>Sign Up!</h2>
        {error && "Registration Failed"}
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
