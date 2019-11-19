import {response} from '../utils/response';
import PostService from '../services/post';

const postService = new PostService();

export default class PostController {
  static async create(req, res) {
    const { id } = req.header.tokenData;
    try {
      const newPost = await postService.save(req.body, id)
      response(res, 201, null, newPost)
    } catch (error) {
      return response(res, 500, error.message, null);
    }
  }

  static async getAll(req, res) {
    try {
      const posts = await postService.getAll(req.body || null);
      response(res, 200, null, {posts, page: req.body.page})
    } catch (error) {
      return response(res, 500, error.message, null);
    }
  }
}