import {
  AboutMe,
  Header,
  Reviews,
  Services,
  Photos,
  News,
  FAQ,
  CreateBookingModal,
  CreateReviewModal,
} from "../../Widgets/index";
import "./style.scss";
import { message } from "antd";
import { useState } from "react";

function Home() {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {openBookingModal && (
        <CreateBookingModal
          openBookingModal={openBookingModal}
          setOpenBookingModal={setOpenBookingModal}
          messageApi={messageApi}
        />
      )}
      {openReviewModal && (
        <CreateReviewModal
          openReviewModal={openReviewModal}
          setOpenReviewModal={setOpenReviewModal}
          messageApi={messageApi}
        />
      )}
      {contextHolder}
      <Header setOpenBookingModal={setOpenBookingModal} />
      <div style={{ padding: "0 70px" }}>
        <AboutMe />
        <Reviews setOpenReviewModal={setOpenReviewModal} />
        <Services />
        <Photos setOpenBookingModal={setOpenBookingModal} />
        <News />
        <FAQ />
      </div>
    </>
  );
}

export default Home;
