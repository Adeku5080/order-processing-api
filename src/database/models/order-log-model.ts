import { Model } from 'objection';
import { BaseModel } from './base.model';
import { OrderModel } from './order.model';

export class OrderLogModel extends BaseModel {
  static tableName = 'order_logs';

  order_id: string;
  description: string;

  order: OrderModel;

  static relationMappings = {
    order: {
      modelClass: OrderModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'order_logs.order_id',
        to: 'orders.id',
      },
    },
  };
}
