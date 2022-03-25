import { useState } from "react";
import "./ChatForm.css";
const ChatForm = (props) => {
  const [message, setMessage] = useState("");
  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddMessage(message);
    setMessage("");
  };
  return (
    <form className="chat-form" onSubmit={submitHandler}>
      <input
        type="text"
        id="message"
        className="message-input"
        value={message}
        onChange={messageChangeHandler}
      />
      <button type="submit" className="message-submit-button">
        Send
      </button>
    </form>
  );
};
export default ChatForm;
