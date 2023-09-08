import { connect } from './config/database';
import app from './config/server';

const port = 8000;

app.listen(port, '', async () => {
  await connect();
  console.debug(`
    - Application running on https://localhost:${port}
  `);
});