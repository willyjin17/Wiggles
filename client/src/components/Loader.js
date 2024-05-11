import "../index.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="lazyLoad">
      <ClipLoader color="#3c2a21" size={60} />
    </div>
  );
};

export default Loader;
