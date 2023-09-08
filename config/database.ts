import path from 'path';
import { newDb } from 'pg-mem';
import { DataSource } from 'typeorm';

export const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  entities: [path.join(__dirname, '/../src/entities/**/*.{js,ts}')],
  synchronize: true
});

export async function connect() {
  return db.initialize();
}

export async function createTestInstance() {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  const dataSource: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [path.join(__dirname, '/../src/entities/**/*.{js,ts}')],
    synchronize: true
  });
  return dataSource;
}