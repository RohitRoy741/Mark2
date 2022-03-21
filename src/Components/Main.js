import Navbar from "./Header/Navbar";
import Chat from "./Chat/Chat";

const Main = (props) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
};

export default Main;
