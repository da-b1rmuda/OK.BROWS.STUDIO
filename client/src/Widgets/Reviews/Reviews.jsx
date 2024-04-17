import "./style.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../App/Routes/routes";
import { UserInfoContext } from "../../App/Context/UserInfoContext/UserInfoContext.jsx";
import { useContext, useState, useEffect } from "react";
import { reviewsApi } from "../../Entities/Reviews/api/service.js";

function Reviews({ setOpenReviewModal }) {
  const definiteReviews = [
    "b8a20615-340d-4f6e-a218-f1645294a2b2",
    "0e418e5d-c4c0-447b-8517-74f006004415",
    "ca0a1d2c-c3c1-4323-a8b8-123152d83166",
    "6c81da6d-1a0f-4475-8c52-2abaff6c4cf9",
    "b5be1fc4-6ca9-440f-a1f2-64dcb478720c",
  ];
  const { data: reviewsData, error } =
    reviewsApi.useGetDefiniteReviewsQuery(definiteReviews);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(reviewsData);
  }, [reviewsData]);

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  // Следующий отзыв
  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Предыдущий отзыв
  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const { userData } = useContext(UserInfoContext);
  let isAuth = false;
  if (userData) {
    isAuth = !Object.values(userData).some((value) => value === "");
  }
  const navigate = useNavigate();

  const onReviewModalOpen = () => {
    if (isAuth) {
      setOpenReviewModal(true);
    } else {
      navigate(routePath.LOGIN_PAGE);
    }
  };
  return (
    <div className="Reviews-container">
      <div className="Reviews-title">
        <h1>// REVIEWS</h1>
      </div>
      <div className="Reviews-content-wrapper">
        <div className="Reviews-content-container">
          <div className="Reviews-content">
            <p>
              {reviews &&
                reviews.length > 0 &&
                reviews[currentReviewIndex]?.review_text}
            </p>
          </div>
          <div className="Reviews-author">
            <div>
              <p>
                {reviews &&
                  reviews.length > 0 &&
                  reviews[currentReviewIndex]?.client_name}
              </p>
            </div>
            <div className="Reviews-author-buttons">
              <button onClick={prevReview}></button>
              <button onClick={nextReview}></button>
            </div>
          </div>
        </div>
        <div className="Reviews-text">
          <p>Мне важно твое мнение</p>
        </div>
        <div className="Reviews-button">
          <Button onClick={onReviewModalOpen}>\\ НАПИСАТЬ ОТЗЫВ \\</Button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
