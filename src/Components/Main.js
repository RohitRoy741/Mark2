import Navbar from "./Header/Navbar";
import ChatList from "./Chat/ChatList";
import Conversation from "./Conversation/Conversation";
import { useEffect, useState } from "react";
import "./Main.css";

const Main = (props) => {
  const [chats, setChats] = useState([]);
  const [conversation, setConversation] = useState(null);
  useEffect(() => {
    console.log("Running Effect");
    fetch("http://127.0.0.1:3001/api/v1/chats", {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setChats(result);
        setConversation(result.data.chats[0]);
      });
  }, []);
  console.log(chats);
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main">
        <ChatList chats={chats} />
        <Conversation conversation={conversation} />
      </main>
    </div>
  );
};

export default Main;
