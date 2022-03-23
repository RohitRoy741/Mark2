import Chat from "./Chat";
import Loader from "./../Auth/Loader";
import "./ChatList.css";

const ChatList = (props) => {
  let chats = null;
  if (props.chats.data) {
    console.log(props.chats.data.chats);
    return (
      <div className="chat-list">
        {props.chats.data.chats.map((item, index) => (
          <Chat
            key={item._id}
            text={item.messages[item.messages.length - 1].text}
            username={
              props.chats.data.usernames[index][0] ===
              localStorage.getItem("username")
                ? props.chats.data.usernames[index][1]
                : props.chats.data.usernames[index][0]
            }
          />
        ))}
      </div>
    );
  } else {
    return <Loader />;
  }
};
export default ChatList;
