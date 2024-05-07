import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { OrderLogModel } from 'src/database/models/order-log-model';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';

@Injectable()
export class OrderLogService {
  constructor(
    @Inject('OrderLogModel')
    private OrderLogModel: ModelClass<OrderLogModel>,
  ) {}

  public async createOrderLog(body: CreateOrderLogDto[]) {
    const orderLog = await this.OrderLogModel.query().insert({
      ...body,
    });

    return orderLog;
  }

  public async getOrderLog(id: string) {
    const orderLog = await this.OrderLogModel.query().findById(id);

    return orderLog;
  }

  public async deleteOrderLog(id: string) {
    await this.OrderLogModel.query().deleteById(id);

    return true;
  }

  public async updateOrderLog(id: string, changes: UpdateOrderLogDto) {
    const orderLog = await this.OrderLogModel.query().patchAndFetchById(
      id,
      changes,
    );

    return orderLog;
  }

  public async listOrderLog() {
    const orderLogs = await this.OrderLogModel.query();
    return orderLogs;
  }
}
