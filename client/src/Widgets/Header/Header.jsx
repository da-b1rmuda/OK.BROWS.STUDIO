import "./style.scss";
import { Button } from "antd";
import { smoothScrollToSection } from "../../Shared/lib/smoothScrollToSection";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../App/Routes/routes";
import { UserInfoContext } from "../../App/Context/UserInfoContext/UserInfoContext.jsx";
import { useContext } from "react";

function Header({ setOpenBookingModal }) {
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
  const onUserProfile = () => {
    if (isAuth) {
      navigate(routePath.PROFILE);
    } else {
      navigate(routePath.LOGIN_PAGE);
    }
  };
  return (
    <div className="Header-container">
      <div className="Header-nav">
        <div className="Header-links">
          <a onClick={() => smoothScrollToSection("aboutMeSection")}>
            ABOUT ME
          </a>
          <a onClick={() => smoothScrollToSection("serviceSection")}>
            SERVICES
          </a>
        </div>
        <div className="Header-logo">
          <p>OK.BROWS</p>
        </div>
        <div className="Header-links links-right">
          <a onClick={() => smoothScrollToSection("faqSection")}>FAQ</a>
          <a onClick={() => smoothScrollToSection("newsSection")}>NEWS</a>
          <a onClick={() => smoothScrollToSection("photoSection")}>PHOTO</a>
          <a onClick={() => smoothScrollToSection("contactsSection")}>
            CONTACTS
          </a>
        </div>
      </div>
      <div className="Header-content-container">
        <div className="Header-content">
          <p>
            Моя особенность - видеть в вас гораздо больше, чем просто брови.
            Помогаю пройти путь, проникнуться фотографией
          </p>
          <div className="Header-content-buttons">
            <div className="Header-content-buttons-paddings">
              <Button onClick={onBookingButton}>Записаться →</Button>
            </div>
            <div>
              <Button onClick={onUserProfile}>Личный кабинет →</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
