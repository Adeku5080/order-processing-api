import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateMealDto {
  @ApiProperty()
  @IsBoolean()
  new: boolean;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  images: string[];

  @ApiProperty()
  @IsString()
  @IsUUID()
  calculatedOrderId: string;
}
