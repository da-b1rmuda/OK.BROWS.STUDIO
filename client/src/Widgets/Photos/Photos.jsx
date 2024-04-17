import "./style.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../App/Routes/routes";
import { UserInfoContext } from "../../App/Context/UserInfoContext/UserInfoContext.jsx";
import { useContext } from "react";

function Photos({ setOpenBookingModal }) {
  const { userData } = useContext(UserInfoContext);
  let isAuth = false;
  if (userData) {
    isAuth = !Object.values(userData).some((value) => value === "");
  }
  const navigate = useNavigate();

  const onBookingButton = () => {
    if (isAuth) {
      setOpenBookingModal(true);
    } else {
      navigate(routePath.LOGIN_PAGE);
    }
  };

  return (
    <div id="photoSection">
      <div className="Photo-title">
        <h1>// PHOTO</h1>
      </div>
      <div className="Photos-button">
        <Button onClick={onBookingButton}>\\ ЗАПИСАТЬСЯ \\</Button>
      </div>
      <div className="Photos-container">
        <img src="/assets/photo1.png" alt="Photo 1" />
        <img
          src="/assets/photo2.png"
          alt="Photo 2"
          style={{ marginTop: "35px" }}
        />
        <img src="/assets/photo3.png" alt="Photo 3" />
      </div>
      <div className="Photos-button">
        <Button onClick={onBookingButton}>\\ ЗАПИСАТЬСЯ \\</Button>
      </div>
    </div>
  );
}

export default Photos;
