import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { MealModel } from 'src/database/models/meal.model';

@Injectable()
export class MealService {
  constructor(
    @Inject('MealModel')
    private MealModel: ModelClass<MealModel>,
  ) {}

  public async createMeal(body: createMealDto[]) {
    const Meal = await this.MealModel.query().insert({
      ...body,
    });

    return Meal;
  }

  public async getMeal(id: string) {
    const meal = await this.MealModel.query().findById(id);

    return meal;
  }

  public async deleteMeal(id: string) {
    await this.MealModel.query().deleteById(id);

    return true;
  }

  public async updateMeal(id: string, changes: UpdateMealDto) {
    const meal = await this.MealModel.query().patchAndFetchById(id, changes);

    return meal;
  }

  public async listMeal() {
    const meals = await this.MealModel.query();
    return meals;
  }
}
