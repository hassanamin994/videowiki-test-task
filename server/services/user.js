import bcrypt from 'bcryptjs';
import {response} from '../utils/response';
import User from '../models/user';

export default class UserService {
  async checkUserForRegister(req, res, next) {
    const existingUser =  await User.findOne({ email: req.body.email });
    if (existingUser) {
      return response(res, 400, 'Email Exist', null);
    }
    return next();
  }

  async checkUserForLogin(req, res, next) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (
      !existingUser ||
      !bcrypt.compareSync(req.body.password, existingUser.password)
    ) {
      return response(res, 404, 'User Not Found', null);
    }
    req.user = existingUser;
    return next();
  }

  async save(request) {
    const user = new User();
    user.displayName = request.displayName;
    user.email = request.email;
    user.password = await bcrypt.hash(request.password, 10);
    return await user.save();
  }
}