import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { RouteGlobalDocumentationDecorator } from 'src/decorators/route-global.decorator';
import { AddOnService } from './add-on.service';
import { ErrorResponseDto } from 'src/error-response.dto';
import { CreateAddOnDto } from './dto/create-add-on.dto';
import { UpdateAddOnDto } from './dto/update-add-on.dto';
import Joi from 'joi';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';

@RouteGlobalDocumentationDecorator('Add On')
@Controller()
export class AddOnController {
  constructor(private readonly addOnService: AddOnService) {}
  @ApiOperation({
    summary: 'Create Add On',
    description: 'Create a Add On given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateAddOnDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Add On.',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'When an attempt to perform this Business Process was executed but for some reason could not be completed given the data provided.',
    type: () => ErrorResponseDto,
  })
  @Post()
  public async createAddOn(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateAddOnDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderDto[],
  ) {
    return await this.addOnService.createAddOn(body);
  }

  @ApiOperation({
    summary: 'Get Add On',
    description: 'Fetch a created Add On',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Add On Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getAddOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.addOnService.getAddOn(id);
  }

  @ApiOperation({
    summary: 'Update Add On',
    description: 'Update an instance by the provided Id and Add On Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateAddOnDto,
    isArray: true,
  })
  @ApiNoContentResponse({
    description: 'Successfully updated details of this entity',
    isArray: false,
    type: String,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Add On',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateAddOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateAddOnDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateAddOnDto,
  ) {
    return await this.addOnService.updateAddOn(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Add On',
    description: 'Delete a Add On with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Add On',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Add On instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAdOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.addOnService.deleteAddOn(id);
  }

  @ApiOperation({
    summary: 'Fetch Add On(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listAddOn() {
    return await this.addOnService.listAddOn();
  }
}
