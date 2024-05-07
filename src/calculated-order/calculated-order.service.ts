import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CalculatedOrderModel } from 'src/database/models/calculated-order';

@Injectable()
export class CalculatedOrderService {
  constructor(
    @Inject('CalculatedOrderModel')
    private CalculatedOrderModel: ModelClass<CalculatedOrderModel>,
  ) {}

  public async createCalculatedOrder(body: CreateCalculatedOrderDto[]) {
    const calculatedOrder = await this.CalculatedOrderModel.query().insert({
      ...body,
    });

    return calculatedOrder;
  }

  public async getCalculatedOrder(id: string) {
    const calculatedOrder =
      await this.CalculatedOrderModel.query().findById(id);

    return calculatedOrder;
  }

  public async deleteCalculatedOrder(id: string) {
    await this.CalculatedOrderModel.query().deleteById(id);

    return true;
  }

  public async updateCalculatedOrder(
    id: string,
    changes: UpdateCalculatedOrderDto,
  ) {
    const calculatedOrder =
      await this.CalculatedOrderModel.query().patchAndFetchById(id, changes);

    return calculatedOrder;
  }

  public async listCalculatedOrder() {
    const calculatedOrders = await this.CalculatedOrderModel.query();
    return calculatedOrders;
  }
}
