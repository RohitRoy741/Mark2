import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Authentication from "./Components/Auth/Authentication";
import Main from "./Components/Main";

function App() {
  const [socket, setSocket] = useState(null);
  console.log("App Rendered!");
  useEffect(() => {
    setSocket(io("http://127.0.0.1:3001"));
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/chat" element={<Main socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
