import { useState } from "react";
import UserCard from "./UserCard";
import Loader from "./../Auth/Loader";
import "./Navbar.css";
const Navbar = (props) => {
  const [username, setUsername] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [passedUsername, setPassedUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://127.0.0.1:3001/api/v1/users/${username}`)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "Success") {
          setPassedUsername(username);
          setShowCard(true);
        } else {
          setUsername("User Not Found");
          setShowCard(true);
        }
      });
  };
  const closeCardHandler = (event) => {
    setShowCard(false);
  };
  return (
    <div>
      {loading && <Loader />}
      {showCard && (
        <UserCard username={passedUsername} onClose={closeCardHandler} />
      )}
      <nav className="top-nav">
        <h1 className="logo-site">Mark 2</h1>
        <form className="search-form" onSubmit={submitHandler}>
          <input
            type="text"
            id="search-username"
            placeholder="Enter username to search"
            value={username}
            onChange={usernameChangeHandler}
          />
        </form>
        <img
          src="https://picsum.photos/200?random=1"
          alt="avatar"
          className="avatar"
        />
      </nav>
      <nav className="bottom-nav">
        <form>
          <input
            type="text"
            placeholder="Enter username"
            id="search-username-bottom"
          />
        </form>
      </nav>
    </div>
  );
};
export default Navbar;
