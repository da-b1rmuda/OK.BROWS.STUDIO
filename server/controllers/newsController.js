import NewsService from "../services/newsService.js";
const newsService = new NewsService();

class NewsController {
  async CreateNews(req, res, next) {
    try {
      const { news_content } = req.body;
      await newsService.createNews(news_content);
      return res.json("Новость успешно создана");
    } catch (e) {
      next(e);
    }
  }

  async EditNews(req, res, next) {
    try {
      const { news_id, news_content } = req.body;
      await newsService.editNews(news_id, news_content);
      return res.json("Новость успешно изменена");
    } catch (e) {
      next(e);
    }
  }

  async DeleteNews(req, res, next) {
    try {
      const { id } = req.params;
      await newsService.deleteNews(id);
      return res.json("Новость успешно удалена");
    } catch (e) {
      next(e);
    }
  }

  async GetNews(req, res, next) {
    try {
      const response = await newsService.getNews();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
}

export default NewsController;
