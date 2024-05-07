import { Model } from 'objection';

import { BaseModel } from './base.model';
import { CalculatedOrderModel } from './calculated-order';
import { BrandModel } from './brand.model';

export class MealModel extends BaseModel {
  static tableName = 'meals';

  calculated_order_id: string;
  brand_id: string;
  new: boolean;
  name: string;
  active: boolean;
  amount: string;
  images: string[];

  calculatedOrder: CalculatedOrderModel;
  brand: BrandModel;

  static relationMappings = {
    calculatedOrder: {
      modelClass: CalculatedOrderModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'meals.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
    brand: {
      modelClass: BrandModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id',
      },
    },
  };
}

// /add brand id to meals .brand has many meals
