import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandModel } from 'src/database/models/brand.model';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BrandModel')
    private BrandModel: ModelClass<BrandModel>,
  ) {}

  public async createBrand(body: CreateBrandDto[]) {
    const brand = await this.BrandModel.query().insert({
      ...body,
    });

    return brand;
  }

  public async getBrand(id: string) {
    const brand = await this.BrandModel.query().findById(id);

    return brand;
  }

  public async deleteBrand(id: string) {
    await this.BrandModel.query().deleteById(id);

    return true;
  }

  public async updateBrand(id: string, changes: UpdateBrandDto) {
    const brand = await this.BrandModel.query().patchAndFetchById(id, changes);

    return brand;
  }

  public async listBrand() {
    const brands = await this.BrandModel.query();
    return brands;
  }
}
