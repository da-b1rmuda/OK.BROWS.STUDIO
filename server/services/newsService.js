import client from "../db.js";

class NewsService {
  async createNews(news_content) {
    await client.query(`insert into news (news_content) values ($1)`, [
      news_content,
    ]);
  }

  async editNews(news_id, news_content) {
    await client.query(
      `update news set 
      news_content = $1 where news_id = $2`,
      [news_content, news_id]
    );
  }

  async deleteNews(news_id) {
    await client.query(`delete from news where news_id = $1`, [news_id]);
  }

  async getNews() {
    const response = await client.query(`select * from news`);
    return response;
  }
}

export default NewsService;
