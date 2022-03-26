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
  const [searchBarActive, setSearchBarActive] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`https://mark-2-convo.herokuapp.com/api/v1/users/${username}`, {
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
  let searchBarStyle = "search-form ";
  let logoStyle = "logo-site ";
  let rightNavStyle = "right-nav ";
  if (searchBarActive) {
    searchBarStyle += "mobile-show";
    logoStyle += "mobile-hide";
    rightNavStyle += "mobile-hide";
  } else {
    searchBarStyle += "mobile-hide";
    logoStyle = "logo-site";
    rightNavStyle = "right-nav";
  }
  const showSearchBar = () => {
    setSearchBarActive(true);
  };
  const hideSearchBar = () => {
    setSearchBarActive(false);
  };
  return (
    <div>
      {loading && <Loader />}
      {showCard && card}
      <nav className="top-nav">
        <h1 className={logoStyle}>Mark 2</h1>
        <form className={searchBarStyle} onSubmit={submitHandler}>
          <input
            type="text"
            id="search-username"
            placeholder="Enter username to search"
            value={username}
            onChange={usernameChangeHandler}
          />
          <span class="material-icons desktop-hide" onClick={hideSearchBar}>
            close
          </span>
        </form>
        <div className={rightNavStyle}>
          <span className="material-icons desktop-hide" onClick={showSearchBar}>
            search
          </span>
          <img
            src="https://picsum.photos/200?random=1"
            alt="avatar"
            className="avatar"
          />
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
