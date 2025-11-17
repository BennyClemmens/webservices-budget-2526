import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function resetDatabase() {
  console.log('🗑️ Resetting database...');

  await db.delete(schema.userFavoritePlaces);
  await db.delete(schema.transactions);
  await db.delete(schema.places);
  await db.delete(schema.users);

  console.log('✅ Database reset completed\n');
}

async function main() {
  console.log('🌱 Starting database emptying...\n');

  await resetDatabase();

  console.log('🎉 Database emptying completed successfully!');
}

main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
