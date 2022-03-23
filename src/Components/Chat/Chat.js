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
  return (
    <div className="chat">
      <img src={src} alt="chat-avatar" className="chat-avatar" />
      <div className="user-details">
        <h3 className="chat-username">{props.username}</h3>
        <p className="chat-message">{props.text.slice(0, 20)}</p>
      </div>
      {/* <button type="submit" onClick={logoutHandler}>
        Logout
      </button> */}
    </div>
  );
};

export default Chat;
