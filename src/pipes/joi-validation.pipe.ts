import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | any) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, {
      allowUnknown: true,
    });

    if (error) {
      throw new BadRequestException(error.details, error);
    }

    return value;
  }
}
