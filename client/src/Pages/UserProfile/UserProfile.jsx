import "./style.scss";
import { Button, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CreateBookingModal, CreateReviewModal } from "../../Widgets/index";
import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { UserInfoContext } from "../../App/Context/UserInfoContext/UserInfoContext.jsx";
import { bookingApi } from "../../Entities/Booking/api/service.js";

function UserProfile() {
  const [messageApi, contextHolder] = message.useMessage();
  const { setUserData } = useContext(UserInfoContext);
  const [user, setUser] = useState({});
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const { data: booking } = bookingApi.useGetAppointmentsUserQuery(
    user.user_id
  );

  const [bookingData, setBookingData] = useState();
  useEffect(() => {
    setBookingData(booking);
  }, [booking]);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setUser(user);
    }
  }, []);

  const navigate = useNavigate();

  const renderUserHistory = (data, mode) => {
    const currentDate = new Date();

    if (!data || data.length === 0) {
      return (
        <div className="UserProfile-filler">
          <p>
            {mode === "history"
              ? "История записей пуста"
              : "На данный момент у вас нет записей"}
          </p>
          {mode === "booking" && (
            <div className="UserProfile-button">
              <Button onClick={onBooking}>\\ ЗАПИСАТЬСЯ \\</Button>
            </div>
          )}
        </div>
      );
    }

    // Фильтрация данных в зависимости от режима
    const filteredData =
      mode === "history"
        ? data.filter((item) => new Date(item.appointment_date) < currentDate)
        : mode === "booking"
        ? data.filter((item) => new Date(item.appointment_date) >= currentDate)
        : data;

    const convertDate = (date) => {
      // Получаем день, месяц и год из объекта Date
      var day = date.getDate();
      var month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
      var year = date.getFullYear();
      // Приводим день и месяц к формату с ведущими нулями, если они меньше 10
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      // Формируем строку в нужном формате
      var formattedDate = year + "-" + month + "-" + day;
      return formattedDate;
    };

    return (
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index}>
              <p>Дата: {convertDate(new Date(item?.appointment_date))}</p>
              <p>Время: {item.appointment_time}</p>
              <p>Процедура: {item.service_name}</p>
              <p>Цена: {item.price}</p>
              <Divider />
            </div>
          ))
        ) : (
          <div className="UserProfile-filler">
            <p>
              {mode === "history"
                ? "История записей пуста"
                : "На данный момент у вас нет записей"}
            </p>
          </div>
        )}
      </div>
    );
  };

  const onBooking = () => {
    setOpenBookingModal(true);
  };
  const onReview = () => {
    setOpenReviewModal(true);
  };
  const onBackHome = () => {
    navigate("/");
  };
  const onLogout = () => {
    setUserData({
      userId: "",
      userName: "",
      userNumberPhone: "",
      userEmail: "",
      userPassword: "",
      role: "",
    });
    localStorage.removeItem("userData");
    navigate("/");
  };

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
      <div className="UserProfile-container">
        <div className="UserProfile-user">
          <h1>//User</h1>
          <div className="UserProfile-user-content">
            <p>{user?.user_name}</p>
            <Button onClick={onLogout}>Выйти из аккаунта</Button>
          </div>
        </div>
        <div className="UserProfile-history">
          <h1>// NOW BOOKINGS</h1>
          <div className="UserProfile-history-content">
            {renderUserHistory(bookingData, "booking")}
          </div>
        </div>
        <div className="UserProfile-history">
          <h1>// HISTORY</h1>
          <div className="UserProfile-history-content">
            {renderUserHistory(bookingData, "history")}
          </div>
        </div>
        <div style={{ margin: "100px" }}>
          <div className="UserProfile-button">
            <Button onClick={onBooking}>\\ ЗАПИСАТЬСЯ ЕЩЁ \\</Button>
          </div>
          <a onClick={onBackHome} className="UserProfile-back">
            перейти на главную
          </a>
          <div className="UserProfile-button">
            <Button onClick={onReview}>\\ НАПИСАТЬ ОТЗЫВ \\</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
