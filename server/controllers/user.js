import UserService from '../services/user';
import {response} from '../utils/response';
import { signToken } from '../utils/jwt'


const userService = new UserService();

export default class UserController {
  static async register(req, res){
    try {
      const newUser = await userService.save(req.body);
      const token = signToken(newUser);
      return response(res, 201, null, { newUser, token });
    } catch (error) {
      return response(res, 500, error.message, null);
    }
  }



  static async login(req, res){
    try {
      const token = signToken(req.user);
      const payload = { message: 'Auth successful', token };
      return response(res, 200, null, payload);
    } catch (error) {
      return response(res, 500, error.message, null);
    }
  }
}