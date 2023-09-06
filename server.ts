import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './database';
import routes from './src/routes/api';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(routes);

const port = 8000;

server.listen(port, '', async () => {
  await connect();
  console.debug(`
    - Application running on https://localhost:${port}
  `);
});
