import ReviewsService from "../services/reviewsService.js";
const reviewsService = new ReviewsService();

class ReviewsController {
  async CreateReview(req, res, next) {
    try {
      const { client_name, review_text, rate } = req.body;
      await reviewsService.createReview(client_name, review_text, rate);
      return res.json("Отзыв успешно оставлен");
    } catch (e) {
      next(e);
    }
  }

  async DeleteReview(req, res, next) {
    try {
      const { id } = req.params;
      await reviewsService.deleteReview(id);
      return res.json("Отзыв успешно удален");
    } catch (e) {
      next(e);
    }
  }

  async GetAllReviews(req, res, next) {
    try {
      const response = await reviewsService.getAllReviews();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async GetDefiniteReviews(req, res, next) {
    try {
      const response = await reviewsService.getDefiniteReviews();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
}

export default ReviewsController;
