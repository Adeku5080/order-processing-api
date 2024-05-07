import { BaseModel } from './base.model';
import { MealModel } from './meal.model';
import { Model } from 'objection';

export class AddOnModel extends BaseModel {
  static tableName = 'add_ons';

  meal_id: string;
  amount: string;
  internal_profit: string;
  meal_data: any;
  meal_addon_id: string;
  min_selection_no: string;
  meal_addon_category_id: string;

  meal: MealModel;

  static relationMappings = {
    meal: {
      modelClass: MealModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'add_ons.meal_id',
        to: 'meals.id',
      },
    },
  };
}
