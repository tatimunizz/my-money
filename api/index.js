import express from 'express';
import morgan from 'morgan';
import router from '../api/routes/index.js';
import '../config/database/databaseConnection.js';

const PORT = process.env.PORT;
const server = express();

server.use(morgan('tiny'));
server.use(express.json());

server.use('/', router);
server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});