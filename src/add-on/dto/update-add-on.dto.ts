
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAddOnDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  internalProfit: string;

  @ApiProperty()
  @IsString()
  mealData: string[];

  @ApiProperty()
  @IsString()
  mealAddOnId: string;

  @ApiProperty()
  @IsString()
  min_selection_no: string;

  @ApiProperty()
  @IsString()
  meal_addon_category_id: string;
}
