import 'dotenv/config';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

export const productionKnexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 0,
    max: 10,
    acquireTimeoutMillis: 60000,
    idleTimeoutMillis: 600000,
  },
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seed.stub',
  },
};

export const developmentKnexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 0,
    max: 10,
    acquireTimeoutMillis: 60000,
    idleTimeoutMillis: 600000,
  },
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seed.stub',
  },
};

module.exports = {
  development: developmentKnexConfig,
  production: productionKnexConfig,
  ...knexSnakeCaseMappers(),
} as Knex.Config;
