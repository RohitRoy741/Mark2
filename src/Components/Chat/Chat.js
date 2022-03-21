import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <div>
      <h1>Hello World!</h1>
      <button type="submit" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Chat;
