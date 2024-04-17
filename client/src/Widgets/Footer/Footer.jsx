import "./style.scss";
import { smoothScrollToSection } from "../../Shared/lib/smoothScrollToSection";
import { contactInfo } from "../../Shared/contactInfo";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../App/Routes/routes";
import { UserInfoContext } from "../../App/Context/UserInfoContext/UserInfoContext.jsx";
import { useContext, useState } from "react";
import { CreateBookingModal } from "../../Widgets/index";

function Footer() {
  const [openBookingModal, setOpenBookingModal] = useState(false);

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
    <>
      {openBookingModal && (
        <CreateBookingModal
          openBookingModal={openBookingModal}
          setOpenBookingModal={setOpenBookingModal}
        />
      )}
      <div className="Footer-container" id="contactsSection">
        <h1>OK.BROWS</h1>
        <div className="Footer-content">
          <div className="Footer-place">
            <p>{contactInfo.city}</p>
            <p>{contactInfo.street}</p>
            <p>{contactInfo.number_phone}</p>
          </div>
          <div className="Footer-links">
            <div className="Footer-links-first">
              <a href={contactInfo.instagram_link}>INSTAGRAM</a>
              <a href={contactInfo.telegram_link}>TELEGRAM</a>
              <a href={contactInfo.whatsapp_link}>WHATSAPP</a>
              <a href={contactInfo.vk_link}>VK</a>
              <a onClick={onBookingButton}>BOOKING</a>
            </div>
            <div className="Footer-links-second">
              <a onClick={() => smoothScrollToSection("aboutMeSection")}>
                ABOUT ME
              </a>
              <a onClick={() => smoothScrollToSection("serviceSection")}>
                SERVICES
              </a>
              <a onClick={() => smoothScrollToSection("newsSection")}>NEWS</a>
              <a onClick={() => smoothScrollToSection("faqSection")}>FAQ</a>
              <a onClick={() => smoothScrollToSection("photoSection")}>PHOTO</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
