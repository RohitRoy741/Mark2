import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

const Chat = (props) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });
  let src = `https://picsum.photos/200?random=${props.username}`;
  const handleClick = () => {
    props.onClick(props.id);
  };
  return (
    <div className="chat" onClick={handleClick}>
      <img src={src} alt="chat-avatar" className="chat-avatar" />
      <div className="user-details">
        <h3 className="chat-username">{props.username}</h3>
        <p className="chat-message">
          {props.text.length > 30
            ? props.text.slice(0, 30) + "..."
            : props.text}
        </p>
      </div>
      {/* <button type="submit" onClick={logoutHandler}>
        Logout
      </button> */}
    </div>
  );
};

export default Chat;
