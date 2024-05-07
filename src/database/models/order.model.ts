import { Model } from 'objection';
import { BaseModel } from './base.model';
import { OrderTypeModel } from './order-type.model';
import { CalculatedOrderModel } from './calculated-order';

export class OrderModel extends BaseModel {
  static tableName = 'orders';

  user_id: string;
  completed: boolean;
  cancelled: boolean;
  kitchen_cancelled: boolean;
  kitchen_accepted: boolean;
  kitchen_dispatched: boolean;
  kitchen_dispatched_time: string;
  completed_time: string;
  rider_id: string;
  kitchen_prepared: boolean;
  rider_assigned: boolean;
  paid: boolean;
  order_code: string;
  order_change: string;
  calculated_order_id: string;
  kitchen_verified_time: string;
  kitchen_completed_time: string;
  shop_accepted: boolean;
  shop_prepared: boolean;
  no_of_mealbags_delivered: number;
  no_of_drinks_delivered: number;
  rider_started_time: string;
  rider_started: boolean;
  rider_arrived_time: string;
  rider_arrived: boolean;
  is_failed_trip: boolean;
  failed_trip_details: object;
  box_number: string;
  shelf_id: string;
  scheduled: boolean;
  confirmed_by_id: string;
  completed_by_id: string;
  scheduled_delivery_date: string;
  scheduled_delivery_time: string;
  is_hidden: boolean;
  order_type_id: string;
  calcuted_order_id: string;

  orderType: OrderTypeModel;
  calculatedOrder: CalculatedOrderModel;

  static relatioMappings = {
    orderType: {
      modelClass: OrderTypeModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'orders.order_type_id',
        to: 'order_types.id',
      },
    },
    calculatedOrder: {
      modelClass: CalculatedOrderModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'orders.calculated_order_id',
        to: 'calculated_ordera.id',
      },
    },
  };
}

//order_type_id ,ordetype has many orders.order has type
//it is the calculated ordeer_id that should be here.
//index each of the foreign keys.x
