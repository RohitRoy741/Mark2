import "./Navbar.css";
const Navbar = (props) => {
  return (
    <div>
      <nav className="top-nav">
        <h1 className="logo-site">Mark 2</h1>
        <form className="search-form">
          <input
            type="text"
            id="search-username"
            placeholder="Enter username to search"
          />
        </form>
        <img
          src="https://picsum.photos/200?random=1"
          alt="avatar"
          className="avatar"
        />
      </nav>
      <nav className="bottom-nav">
        <form>
          <input
            type="text"
            placeholder="Enter username"
            id="search-username-bottom"
          />
        </form>
      </nav>
    </div>
  );
};
export default Navbar;
