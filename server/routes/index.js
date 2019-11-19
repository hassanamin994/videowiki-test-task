import userRoute from './user';
import postRoute from './post';

const api = '/api/';

export default app => {
  app.use(api, userRoute);
  app.use(api, postRoute);
};