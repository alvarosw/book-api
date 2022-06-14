import { DataSource } from 'typeorm'

const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  entities: ["lib/entities/**/*.js"],
})

export async function connect() {
    return db.initialize()
}
