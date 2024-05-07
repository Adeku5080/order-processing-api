import { Inject, Injectable } from '@nestjs/common';
import { createOrderDto } from './dto/create-order.dto';
import { OrderModel } from 'src/database/models/order.model';
import { ModelClass } from 'objection';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderModel')
    private OrderModel: ModelClass<OrderModel>,
  ) {}

  public async createOrder(body: createOrderDto[]) {
    const order = await this.OrderModel.query().insert({
      ...body,
    });

    return order;
  }

  public async getOrder(id: string) {
    const order = await this.OrderModel.query().findById(id);

    return order;
  }

  public async deleteOrder(id: string) {
    await this.OrderModel.query().deleteById(id);

    return true;
  }

  public async updateOrder(id: string, changes: UpdateOrderDto) {
    const order = await this.OrderModel.query().patchAndFetchById(id, changes);

    return order;
  }

  public async listOrder() {
    const orders = await this.OrderModel.query();
    return orders;
  }

  public async processOrder() {}
}
