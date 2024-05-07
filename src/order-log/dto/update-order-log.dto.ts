import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UpdateOrderLogDto {
  @ApiProperty()
  @IsString()
  desciption: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  order_id: string;
}
