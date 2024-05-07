import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dtos/error-response.dto';

export const RouteGlobalDocumentationDecorator = (tag: string) => {
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Missing relevant resource',
      type: () => ErrorResponseDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server response',
      type: () => ErrorResponseDto,
    }),
    ApiForbiddenResponse({
      description: 'Auth. Expired!',
      type: () => ErrorResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Validation failure related errors!',
      type: () => ErrorResponseDto,
    }),
  );
};
