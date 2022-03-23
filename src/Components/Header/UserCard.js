import "./UserCard.css";
const UserCard = (props) => {
  return (
    <div className="centre">
      <div className="backdrop"></div>
      <div className="user-card">
        <img
          src="https://picsum.photos/200?random=2"
          alt="user-avatar"
          className="user-avatar"
        />
        <h1 className="username">{props.username}</h1>
        <div className="button-group">
          <button className="add-button btn">Add User</button>
          <button className="close-button btn" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
