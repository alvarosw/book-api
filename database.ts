import path from 'path';
import { DataSource } from 'typeorm';

export const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  entities: [path.join(__dirname, '/src/entities/**/*.{js,ts}')],
  synchronize: true
});

export async function connect() {
  return db.initialize();
}
