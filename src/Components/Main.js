import Navbar from "./Header/Navbar";
import ChatList from "./Chat/ChatList";
import Conversation from "./Conversation/Conversation";
import { useEffect, useState } from "react";
import "./Main.css";

const Main = (props) => {
  const [chats, setChats] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [activeUser, setActiveUser] = useState("");
  const [inactiveComponent, setInactiveComponent] = useState("conversation");
  console.log("Main Rendered: ", chats, conversation, activeUser, props.socket);
  useEffect(() => {
    console.log("Running Effect", props.socket);
    props.socket &&
      props.socket.emit("authentication", localStorage.getItem("username"));
    props.socket &&
      props.socket.on("hello", (text) => {
        console.log("From Server " + text);
      });
    let incomingListener = (chatId, text, username) => {
      console.log("incoming", props.socket);
      if (localStorage.getItem("username") === username) {
        console.log("self");
        return;
      }
      props.socket.emit("receive", props.socket.id);
      setChats((chats) => {
        const prevChats = { ...chats };
        let temp = chats.data.chats.slice();
        for (let chat of temp) {
          if (chat._id === chatId) {
            chat.messages.push({ text, sender: "other", time: Date.now() });
          }
        }
        prevChats.data.chats = temp;
        return prevChats;
      });
      console.log("Incoming Request");
      console.log(chatId);
      console.log(text);
      console.log(username);
    };
    if (props.socket) {
      props.socket.removeAllListeners("client-incoming-message");
      props.socket.on("client-incoming-message", incomingListener);
    }
    if (props.socket) {
      fetch("http://127.0.0.1:3001/api/v1/chats", {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data.usernames.length > 0) {
            setActiveUser(
              result.data.usernames[0][0] === localStorage.getItem("username")
                ? result.data.usernames[0][1]
                : result.data.usernames[0][0]
            );
          }
          setChats(result);
          for (let chat of result.data.chats) {
            props.socket.emit("join-chat", chat._id);
          }
        });
    }
    return () => {
      console.log(props.socket, "end effect");
      if (props.socket) {
        props.socket.removeAllListeners("client-incoming-message");
        props.socket.removeAllListeners("hello");
      }
      console.log(props.socket, "end effect");
    };
  }, [props.socket]);
  const addMessageHandler = (chatId, sender, text, outgoing = true) => {
    setChats((chats) => {
      const prevChats = { ...chats };
      console.log(chats);
      let temp = chats.data.chats.slice();
      for (let chat of temp) {
        if (chat._id === chatId) {
          chat.messages.push({ text, sender, time: Date.now() });
        }
      }
      prevChats.data.chats = temp;
      return prevChats;
    });

    outgoing &&
      props.socket.emit(
        "client-outgoing-message",
        chatId,
        text,
        localStorage.getItem("username")
      );
  };
  const onChangeConversation = (id) => {
    console.log(id);
    let index = 0;
    for (let chat of chats.data.chats) {
      if (chat._id === id) {
        break;
      } else {
        index++;
      }
    }
    const newConversation = chats.data.chats[index];
    const newUsername =
      chats.data.usernames[index][0] === localStorage.getItem("username")
        ? chats.data.usernames[index][1]
        : chats.data.usernames[index][0];
    setConversation(newConversation);
    setActiveUser(newUsername);
    setInactiveComponent("chat-list");
  };

  let conversationStyle = "mobile-hide";
  let chatListStyle = "mobile-show";
  if (inactiveComponent !== "conversation") {
    chatListStyle = "mobile-hide";
    conversationStyle = "mobile-show";
  }
  const handleToggleMobile = () => {
    setInactiveComponent("conversation");
  };
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main">
        <ChatList
          chats={chats}
          onChangeConversation={onChangeConversation}
          classes={chatListStyle}
        />
        <Conversation
          conversation={conversation}
          username={activeUser}
          onAddMessage={addMessageHandler}
          onBack={handleToggleMobile}
          classes={conversationStyle}
        />
      </main>
    </div>
  );
};

export default Main;
