import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ name: 'status', type: 'number', required: false })
  status?: number;

  @ApiProperty({ name: 'statusCode', type: 'number', required: false })
  statusCode?: number;

  @ApiProperty({ name: 'message', type: 'string' })
  message: string | string[];

  @ApiProperty({ name: 'error', type: 'string' })
  error: string;
}
