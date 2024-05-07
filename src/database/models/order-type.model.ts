import { Model } from 'objection';

import { BaseModel } from './base.model';
import { OrderModel } from './order.model';

export class OrderTypeModel extends BaseModel {
  static tablename = 'order_types';

  name: string;

  order: OrderModel;

  static relationMappings = {
    order: {
      modelClass: OrderModel,
      relation: Model.HasManyRelation,
      join: {
        from: 'order_type.id',
        to: 'orders.order_type_id',
      },
    },
  };
}
