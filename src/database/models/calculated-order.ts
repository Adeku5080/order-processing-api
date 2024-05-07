import { Model } from 'objection';
import { BaseModel } from './base.model';
import { OrderModel } from './order.model';

export class CalculatedOrderModel extends BaseModel {
  static tableName = 'calculated_orders';

  total_amount: string;
  free_delivery: boolean;
  delivery_fee: string;
  service_charge: string;
  lat: number;
  lng: number;
  cokitchen_polygon: string;
  pickup: boolean;
  prev_price: string;
  address_details: any;

  order: OrderModel;

  static relationMappings = {
    order: {
      modelClass: OrderModel,
      relation: Model.HasManyRelation,
      join: {
        from: 'calculated_orders',
        to: 'orders.calculated_orders_id',
      },
    },
  };
}

//change everything to snake case
