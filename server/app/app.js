import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import { dbConnect } from '../config/database';

var http = require('http').createServer()
var io = require('socket.io')(http);

const app = express();
dbConnect();

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// io.of("/api").on("connection", socket => {
//   //Welcome new joiners!
//   socket.emit("welcome", "This is the Gaming Channel!");
// })

io.on('connection', (socket) => {
  socket.emit('welcome', 'you are connected to simple blog')
})
routes(app);

// app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('/*', (_req, res) => {
  res.status(200).send('Simple Blog API');
});

export {app, http};
