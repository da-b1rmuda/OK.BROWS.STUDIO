import client from "../db.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
  async registration(user_name, user_phone_number, user_email, user_password) {
    let hasAlreadyEmail = await client.query(
      `select user_email from users where user_email = $1`,
      [user_email]
    );
    if (
      hasAlreadyEmail.rows[0] !== null &&
      hasAlreadyEmail.rows[0] !== undefined
    ) {
      throw ApiError.BadRequest("Данная почта уже существует");
    }
    await client.query(
      `insert into users (user_name, user_phone_number, user_email, user_password) 
              values ($1, $2, $3, $4)`,
      [user_name, user_phone_number, user_email, user_password]
    );
  }

  async login(login, user_password) {
    const response = await client.query(
      `select user_id, user_name, user_phone_number, user_email, user_password, role
      from users where (user_phone_number = $1 or user_email = $1) and user_password = $2`,
      [login, user_password]
    );
    if (response.rows[0] === null || response.rows[0] === undefined) {
      throw ApiError.BadRequest("Неправильный логин или пароль");
    }
    return response;
  }

  async editUser(
    user_id,
    user_name,
    user_number_phone,
    user_email,
    user_password,
    role
  ) {
    await client.query(
      `update users set 
        user_name = $1, user_number_phone = $2, user_email = $3, user_password = $4, role = $5 
        where id_user = $6`,
      [user_name, user_number_phone, user_email, user_password, role, user_id]
    );
  }

  async deleteUser(user_id) {
    await client.query(`delete from users where user_id = $1`, [user_id]);
  }

  async getUsers() {
    const response = await client.query(`select * from users`);
    return response;
  }

  async getUserInfo(user_id) {
    const response = await client.query(
      `select * from users where user_id = $1`,
      [user_id]
    );
    return response;
  }

  async getUserVisitsHistory(user_id) {
    const response = await client.query(
      `select * from appointments where client_id = $1`,
      [user_id]
    );
    return response;
  }
}

export default UserService;
