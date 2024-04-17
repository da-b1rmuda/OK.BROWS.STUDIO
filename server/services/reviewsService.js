import client from "../db.js";

class ReviewsService {
  async createReview(client_name, review_text, rate) {
    console.log(client_name, review_text, rate);
    await client.query(
      `insert into reviews (client_name, review_text, rate) 
                values ($1, $2, $3)`,
      [client_name, review_text, rate]
    );
  }

  async deleteReview(review_id) {
    await client.query(`delete from reviews where review_id = $1`, [review_id]);
  }

  async getAllReviews() {
    const response = await client.query(`select * from reviews`);
    return response;
  }

  async getDefiniteReviews() {
    const response = await client.query(
      `select * from reviews where reviews.rate = 5 ORDER BY reviews.review_date DESC limit 5`
    );
    return response;
  }
}

export default ReviewsService;
