import { useNavigate } from "react-router-dom";
import "../index.css";
const Button = ({ text, type, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  return (
    <>
      {type === "submit" ? (
        <div
          style={{
            textTransform: "capitalize",
            fontWeight: "500",
            width: "fit-content",
          }}
        >
          <button type={type} className="btn">
            {text}
          </button>
        </div>
      ) : (
        <div
          style={{
            textTransform: "capitalize",
            fontWeight: "500",
            width: "fit-content",
          }}
          onClick={handleClick}
        >
          <button type={type} className="btn">
            {text}
          </button>
        </div>
      )}
    </>
  );
};

export default Button;
