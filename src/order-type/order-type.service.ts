import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { OrderTypeModel } from 'src/database/models/order-type.model';

@Injectable()
export class OrderTypeService {
  constructor(
    @Inject('OrderTypeModel')
    private OrderTypeModel: ModelClass<OrderTypeModel>,
  ) {}

  public async createOrderType(body: CreateOrderTypeDto[]) {
    const orderType = await this.OrderTypeModel.query().insert({
      ...body,
    });

    return orderType;
  }

  public async getOrderType(id: string) {
    const OrderType = await this.OrderTypeModel.query().findById(id);

    return OrderType;
  }

  public async deleteOrderType(id: string) {
    await this.OrderTypeModel.query().deleteById(id);

    return true;
  }

  public async updateOrderType(id: string, changes: UpdateOrderTypeDto) {
    const OrderType = await this.OrderTypeModel.query().patchAndFetchById(
      id,
      changes,
    );

    return OrderType;
  }

  public async listOrderType() {
    const OrderTypes = await this.OrderTypeModel.query();
    return OrderTypes;
  }
}
