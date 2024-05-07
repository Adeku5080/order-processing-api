import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class UpdateBrandDto {
  @ApiProperty()
  @IsString()
  name: string;
}
