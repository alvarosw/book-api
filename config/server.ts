import express from 'express';
import { loadControllers } from 'awilix-express';
import { dependencyInjectionRequestScope } from './container';

const app = express();

app.use(express.json());
app.use(dependencyInjectionRequestScope);
app.use(loadControllers(
  'src/controllers/*.{js,ts}',
  { cwd: __dirname }
));

export default app;
