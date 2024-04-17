import Router from "express";
import NewsController from "../controllers/newsController.js";

const newsController = new NewsController();
const newsRouter = new Router();

newsRouter.post("/createNews", newsController.CreateNews);
newsRouter.put("/editNews", newsController.EditNews);
newsRouter.get("/getNews", newsController.GetNews);
newsRouter.delete("/deleteNews/:id", newsController.DeleteNews);

export default newsRouter;
