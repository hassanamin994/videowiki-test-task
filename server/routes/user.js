import express from 'express';
import UserController from '../controllers/user';
import UserService from '../services/user'

const userService = new UserService();

const userRouter = express.Router();

userRouter.post(
  '/users',
  userService.checkUserForRegister,
  UserController.register,
);

userRouter.post(
  '/users/login',
  userService.checkUserForLogin,
  UserController.login
);

export default userRouter;