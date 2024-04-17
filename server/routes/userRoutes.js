import Router from "express";
import UserController from "../controllers/userController.js";

const userController = new UserController();
const userRouter = new Router();

userRouter.post("/registration", userController.Registration);
userRouter.post("/login", userController.Login);
userRouter.put("/editUser", userController.EditUser);
userRouter.delete("/deleteUser/:id", userController.DeleteUser);
userRouter.get("/getUsers", userController.GetUsers);
userRouter.get("/getUsersInfo/:id", userController.GetUserInfo);
userRouter.get(
  "/getUserVisitsHistory/:id",
  userController.GetUserVisitsHistory
);

export default userRouter;
