import moment from 'moment';
import Post from '../models/post';

export default class PostService {
  async save(request, userId) {
    const post = new Post();
    post.title = request.title;
    post.image = request.image;
    post.content = request.content;
    post.writer = userId
    post.date = moment(new Date()).format("YYYY-MM-DD")
    return await post.save();
  }

  async getAll(request) {
    const page = parseInt(request.page, 10) || 1;
    const offset = (page - 1) * 9; 
    const options =  {
      // sort: {date: -1},
      limit: 9,
      page,
      offset,
    }
    const posts = await Post.paginate({}, options);
    return posts
  }
}