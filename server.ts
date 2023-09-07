import express from 'express';
import { connect } from './database';
import { loadControllers } from 'awilix-express';
import { dependencyInjectionRequestScope } from './container';

const server = express();

server.use(express.json());
server.use(dependencyInjectionRequestScope);
server.use(loadControllers(
  'src/controllers/*.{js,ts}',
  { cwd: __dirname }
));

const port = 8000;

server.listen(port, '', async () => {
  await connect();
  console.debug(`
    - Application running on https://localhost:${port}
  `);
});
