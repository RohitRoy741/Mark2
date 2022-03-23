import ChatForm from "./ChatForm";
import Message from "./Message";
import "./Conversation.css";
const Conversation = (props) => {
  if (!props.conversation || !props.conversation.messages) {
    return <h3>Your messages will appear here.</h3>;
  }
  return (
    <div className="conversation">
      <div className="messages">
        {props.conversation.messages.map((message, index) => {
          return (
            <Message
              text={message.text}
              key={message.time}
              sender={message.sender}
              receiver={message.receiver}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Conversation;
