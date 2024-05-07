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
import { OrderLogService } from './order-log.service';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import Joi from 'joi';
import { ErrorResponseDto } from 'src/error-response.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';

@RouteGlobalDocumentationDecorator('Order Log')
@Controller()
export class OrderLogController {
  constructor(private readonly orderLogService: OrderLogService) {}
  @ApiOperation({
    summary: 'Create Order Log',
    description: 'Create a Order Log given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateOrderLogDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Order Log.',
  })
  @Post()
  public async createOrderLog(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateOrderDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderLogDto[],
  ) {
    return await this.orderLogService.createOrderLog(body);
  }

  @ApiOperation({
    summary: 'Get Order Log',
    description: 'Fetch a created Order Log',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Order Log Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getOrderLog(id: string) {
    return await this.orderLogService.getOrderLog(id);
  }

  @ApiOperation({
    summary: 'Update Order Log',
    description: 'Update an instance by the provided Id and Order Log Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateOrderLogDto,
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
    description: 'An example ID of a Order Log',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateOrderLog(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateOrderLogDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateOrderLogDto,
  ) {
    return await this.orderLogService.updateOrderLog(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Order Log',
    description: 'Delete a Order Log with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Order Log',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Order Log instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAdOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.orderLogService.deleteOrderLog(id);
  }

  @ApiOperation({
    summary: 'Fetch Order Log(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listOrderLog() {
    return await this.orderLogService.listOrderLog();
  }
}
