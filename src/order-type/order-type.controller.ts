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
import { OrderTypeService } from './order-type.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import Joi from 'joi';
import { ErrorResponseDto } from 'src/error-response.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { UpdateOrderTypeDto } from './dto/upate-order-type.dto';

@RouteGlobalDocumentationDecorator('Order Type')
@Controller()
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}
  @ApiOperation({
    summary: 'Create Order Type',
    description: 'Create a Order Type given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateOrderTypeDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Order Type.',
  })
  @Post()
  public async createOrderType(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateOrderTypeDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderTypeDto[],
  ) {
    return await this.orderTypeService.createOrderType(body);
  }

  @ApiOperation({
    summary: 'Get Order Type',
    description: 'Fetch a created Order Type',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Order Type Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getOrderType(id: string) {
    return await this.orderTypeService.getOrderType(id);
  }

  @ApiOperation({
    summary: 'Update Order Type',
    description: 'Update an instance by the provided Id and Order Type Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateOrderTypeDto,
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
    description: 'An example ID of a Order Type',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateOrderType(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateOrderTypeDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateOrderTypeDto,
  ) {
    return await this.orderTypeService.updateOrderType(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Order Type',
    description: 'Delete a Order Type with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Order Type',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Order Type instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAdOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.orderTypeService.deleteOrderType(id);
  }

  @ApiOperation({
    summary: 'Fetch Order Type(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listOrderType() {
    return await this.orderTypeService.listOrderType();
  }
}
