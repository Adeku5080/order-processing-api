import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCalculatedOrderDto {
  @ApiProperty()
  @IsString()
  totalAmount: string;

  @ApiProperty()
  @IsString()
  freeDelivery: string;

  @ApiProperty()
  @IsString()
  deliveryFee: string;

  @ApiProperty()
  @IsString()
  serviceCharge: string;

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;

  @ApiProperty()
  @IsString()
  cokitchePolygon: string;

  @ApiProperty()
  @IsString()
  pickup: string;

  @ApiProperty()
  @IsString()
  prevPric: string;

  @ApiProperty()
  @IsString()
  addressDetails: string[];

  @ApiProperty()
  @IsString()
  @IsUUID()
  orderId: string;
}
