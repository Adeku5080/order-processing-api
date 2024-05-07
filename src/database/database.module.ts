import 'dotenv/config';
import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { AddOnModel } from './models/addon.model';
import { BrandModel } from './models/brand.model';
import { CalculatedOrderModel } from './models/calculated-order';
import { MealModel } from './models/meal.model';
import { OrderLogModel } from './models/order-log-model';
import { OrderTypeModel } from './models/order-type.model';
import { OrderModel } from './models/order.model';

const models = [
  AddOnModel,
  BrandModel,
  CalculatedOrderModel,
  MealModel,
  OrderLogModel,
  OrderTypeModel,
  OrderModel,
];
console.log(process.env.DATABASE_HOST);
export const getKnex = async () => {
  const knex = Knex.knex({
    client: 'pg',
    debug: false,
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

    ...knexSnakeCaseMappers(),
  });

  Model.knex(knex);
  return knex;
};

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: getKnex,
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
