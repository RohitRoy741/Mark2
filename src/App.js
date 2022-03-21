import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./Components/Auth/Authentication";
import Main from "./Components/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/chat" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
