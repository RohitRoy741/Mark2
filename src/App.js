import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./Components/Authentication";
import Chat from "./Components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
