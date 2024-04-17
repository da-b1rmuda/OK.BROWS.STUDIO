import Router from "express";
import ReviewsController from "../controllers/reviewsController.js";

const reviewsController = new ReviewsController();
const reviewsRouter = new Router();

reviewsRouter.post("/createReview", reviewsController.CreateReview);
reviewsRouter.delete("/deleteReview/:id", reviewsController.DeleteReview);
reviewsRouter.get("/getAllReviews", reviewsController.GetAllReviews);
reviewsRouter.get("/getDefiniteReviews", reviewsController.GetDefiniteReviews);

export default reviewsRouter;
