import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty()
  @IsBoolean()
  cancelled: boolean;

  @ApiProperty()
  @IsBoolean()
  kitchenCancelled: boolean;

  @ApiProperty()
  @IsBoolean()
  kitchenAccepted: boolean;

  @ApiProperty()
  @IsBoolean()
  kitchenDispatched: boolean;

  @ApiProperty()
  @IsString()
  kitchenDispatchedTime: string;

  @ApiProperty()
  @IsString()
  completedTime: string;

  @ApiProperty()
  @IsString()
  riderId: string;

  @ApiProperty()
  @IsBoolean()
  kitchednPrepared: boolean;

  @ApiProperty()
  @IsBoolean()
  riderAssigned: boolean;

  @ApiProperty()
  @IsBoolean()
  paid: boolean;

  @ApiProperty()
  @IsString()
  orderCode: string;

  @ApiProperty()
  @IsString()
  orderChange: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  calculatedOrderId: string;

  @ApiProperty()
  @IsString()
  kitchenVerifiedTime: string;

  @ApiProperty()
  @IsString()
  kitchemCompletedTime: string;

  @ApiProperty()
  @IsBoolean()
  shopAccepted: boolean;

  @ApiProperty()
  @IsBoolean()
  shopPrepared: boolean;

  @ApiProperty()
  @IsString()
  noOfMealBagsDelivered: string;

  @ApiProperty()
  @IsString()
  noOfDrinksDelivered: string;

  @ApiProperty()
  @IsString()
  riderStartedTime: string;

  @ApiProperty()
  @IsString()
  riderArrivedTime: string;

  @ApiProperty()
  @IsBoolean()
  riderArrived: boolean;

  @ApiProperty()
  @IsBoolean()
  isFailedTrip: boolean;
  @ApiProperty()
  @IsArray()
  failedTripDetails: string[];

  @ApiProperty()
  @IsString()
  boxNumber: string;

  @ApiProperty()
  @IsString()
  shelfId: string;
  @ApiProperty()
  @IsBoolean()
  schedules: boolean;

  @ApiProperty()
  @IsString()
  confirmedById: string;

  @ApiProperty()
  @IsString()
  completedById: string;

  @ApiProperty()
  @IsString()
  scheduledDeliveryDate: string;

  @ApiProperty()
  @IsString()
  scheduledDeliveryTime: string;

  @ApiProperty()
  @IsBoolean()
  is_hidden: boolean;
}
