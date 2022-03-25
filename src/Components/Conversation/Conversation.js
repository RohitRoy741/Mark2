import ChatForm from "./ChatForm";
import Message from "./Message";
import "./Conversation.css";
import { useEffect } from "react";

const Conversation = (props) => {
  useEffect(() => {
    console.log("Conversation Rendered", props);
    const messageElement = document.getElementById("messages-div");
    if (!messageElement) {
      return;
    }
    messageElement.lastChild.scrollIntoView({ behavior: "smooth" });
  });
  const onAddMessage = (text) => {
    console.group(text);
    props.onAddMessage(
      props.conversation._id,
      localStorage.getItem("id"),
      text
    );
    fetch("http://127.0.0.1:3001/api/v1/chats", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        receiverId: localStorage.getItem("id"),
        chatId: props.conversation._id,
        text,
      }),
    })
      .then((response) => response.json())
      .then((result) => null);
  };
  if (!props.conversation || !props.conversation.messages) {
    return <h3 className={props.classes}>Your messages will appear here.</h3>;
  } else {
    // props.conversation.messages = props.conversation.messages.filter(
    //   (element, index, array) => index === array.indexOf(element)
    // );
  }
  let src = `https://picsum.photos/200?random=${props.username}`;
  const style = `conversation ${props.classes}`;
  return (
    <div className={style}>
      <div className="conversation-header">
        <span className="material-icons desktop-hide" onClick={props.onBack}>
          arrow_back
        </span>
        <img
          src={src}
          alt="conversation-header-avatar"
          className="conversation-header-avatar"
        />
        <h1 className="conversation-header-username">{props.username}</h1>
      </div>
      <div className="messages" id="messages-div">
        {props.conversation.messages.map((message, index) => {
          return (
            <Message
              text={message.text}
              key={index}
              sender={message.sender}
              receiver={message.receiver}
            />
          );
        })}
      </div>
      <ChatForm onAddMessage={onAddMessage} />
    </div>
  );
};
export default Conversation;
