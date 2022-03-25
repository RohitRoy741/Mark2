import "./Message.css";
const Message = (props) => {
  let alignClass = "message";
  if (props.sender === "Server") {
    alignClass += " server";
  } else if (props.sender === localStorage.getItem("id")) {
    alignClass += " self";
  } else {
    alignClass += " other";
  }

  return <p className={alignClass}>{props.text}</p>;
};
export default Message;
