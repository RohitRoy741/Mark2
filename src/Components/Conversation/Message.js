import "./Message.css";
const Message = (props) => {
  let alignClass = "message";
  if (props.sender === "Server") {
    alignClass += " server";
  }

  return <p className={alignClass}>{props.text}</p>;
};
export default Message;
