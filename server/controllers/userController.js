import UserService from "../services/userService.js";
const userService = new UserService();

class UserController {
  async Registration(req, res, next) {
    try {
      const { user_name, user_number_phone, user_email, user_password } =
        req.body;
      await userService.registration(
        user_name,
        user_number_phone,
        user_email,
        user_password
      );
      return res.json("Регистрация успешно завершена");
    } catch (e) {
      next(e);
    }
  }

  async Login(req, res, next) {
    try {
      const { login, user_password } = req.body;
      const response = await userService.login(login, user_password);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async EditUser(req, res, next) {
    try {
      const { data } = req.body;
      const {
        user_id,
        user_name,
        user_number_phone,
        user_email,
        user_password,
        role,
      } = data;
      await userService.editUser(
        user_id,
        user_name,
        user_number_phone,
        user_email,
        user_password,
        role
      );
      return res.json("Пользователь успешно изменен");
    } catch (e) {
      next(e);
    }
  }

  async DeleteUser(req, res, next) {
    try {
      const { user_id } = req.params;
      await userService.deleteUser(user_id);
      return res.json("Пользователь успешно удален");
    } catch (e) {
      next(e);
    }
  }

  async GetUsers(req, res, next) {
    try {
      const response = await userService.getUsers();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async GetUserInfo(req, res, next) {
    try {
      const { user_id } = req.params;
      await userService.getUserInfo(user_id);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async GetUserVisitsHistory(req, res, next) {
    try {
      const { user_id } = req.params;
      await userService.getUserVisitsHistory(user_id);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
