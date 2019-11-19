import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import User from './user';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  date: {
    type: Date,
    required: true
  }
});

PostSchema.plugin(mongoosePaginate);
const Post = mongoose.model('Post', PostSchema);
export default Post;