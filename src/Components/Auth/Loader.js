import { ClipLoader } from "react-spinners";
import "./Loader.css";

const Loader = (props) => {
  return (
    <div className="loader-screen">
      <ClipLoader color="#0000ff" size={100} />
    </div>
  );
};

export default Loader;
