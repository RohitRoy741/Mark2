import { useState } from "react";
import UserCard from "./UserCard";
import Loader from "./../Auth/Loader";
import "./Navbar.css";
const Navbar = (props) => {
  const [username, setUsername] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://127.0.0.1:3001/api/v1/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "Success") {
          setCard(
            <UserCard
              username={result.username}
              onClose={closeCardHandler}
              id={result.userId}
            />
          );
          setShowCard(true);
        } else {
          setCard(<UserCard username="Not Found" onClose={closeCardHandler} />);
          setUsername("User Not Found");
          setShowCard(true);
        }
      });
  };
  const closeCardHandler = (event) => {
    setUsername("");
    setShowCard(false);
  };
  return (
    <div>
      {loading && <Loader />}
      {showCard && card}
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
    </div>
  );
};
export default Navbar;
