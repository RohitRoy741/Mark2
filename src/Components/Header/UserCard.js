import { useState } from "react";
import Loader from "./../Auth/Loader";
import "./UserCard.css";
import { io } from "socket.io-client";
const UserCard = (props) => {
  const socket = io("http://127.0.0.1:3001");
  const [loading, setLoading] = useState(false);
  const addUserHandler = () => {
    setLoading(true);
    fetch("http://127.0.0.1:3001/api/v1/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: props.id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        socket.emit(
          "add-contact",
          result.data.chat._id,
          props.username,
          localStorage.getItem("id"),
          localStorage.getItem("username")
        );
        window.location.reload(true);
      });
  };
  return (
    <div className="centre">
      {loading && <Loader />}
      <div className="backdrop"></div>
      <div className="user-card">
        {props.id && (
          <img
            src="https://picsum.photos/200?random=2"
            alt="user-avatar"
            className="user-avatar"
          />
        )}
        <h1 className="username">{props.username}</h1>
        <div className="button-group">
          {props.id && (
            <button className="add-button btn" onClick={addUserHandler}>
              Add User
            </button>
          )}
          <button className="close-button btn" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
