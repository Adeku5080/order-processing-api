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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ErrorResponseDto } from 'src/error-response.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';

@RouteGlobalDocumentationDecorator('Order')
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiOperation({
    summary: 'Create Order',
    description: 'Create a Order given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateOrderDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Order.',
  })
  @Post()
  public async createOrder(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateOrderDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderDto[],
  ) {
    return await this.orderService.createOrder(body);
  }

  @ApiOperation({
    summary: 'Get Order',
    description: 'Fetch a created Order',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Order Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getOrder(id: string) {
    return await this.orderService.getOrder(id);
  }

  @ApiOperation({
    summary: 'Update Order',
    description: 'Update an instance by the provided Id and Order Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateOrderDto,
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
    description: 'An example ID of a Order',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateOrder(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateOrderDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Order',
    description: 'Delete a Order with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Order',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Order instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAdOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.orderService.deleteOrder(id);
  }

  @ApiOperation({
    summary: 'Fetch Order(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listOrder() {
    return await this.orderService.listOrder();
  }
}
