import { DataSource } from 'typeorm';

export const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  entities: ["build/src/entities/**/*.js"],
  synchronize: true
});

export async function connect() {
  return db.initialize();
}
