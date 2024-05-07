import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AddOnModel } from 'src/database/models/addon.model';

@Injectable()
export class AddOnService {
  constructor(
    @Inject('AddOnModel')
    private AddOnModel: ModelClass<AddOnModel>,
  ) {}

  public async createAddOn(body: CreateAddOnDto[]) {
    const addOn = await this.AddOnModel.query().insert({
      ...body,
    });

    return addOn;
  }

  public async getAddOn(id: string) {
    const addOn = await this.AddOnModel.query().findById(id);

    return addOn;
  }

  public async deleteAddOn(id: string) {
    await this.AddOnModel.query().deleteById(id);

    return true;
  }

  public async updateAddOn(id: string, changes: UpdateAddOnDto) {
    const addOn = await this.AddOnModel.query().patchAndFetchById(id, changes);

    return addOn;
  }

  public async listAddOn() {
    const addOns = await this.AddOnModel.query();
    return addOns;
  }
}
