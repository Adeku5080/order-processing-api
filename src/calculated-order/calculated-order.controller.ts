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
import { CalculatedOrderService } from './calculated-order.service';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import Joi from 'joi';
import { ErrorResponseDto } from 'src/error-response.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { UpdateCalculatedOrderDto } from './dto/updat-calculated-order.dto';

@RouteGlobalDocumentationDecorator('Calculated Order')
@Controller()
export class CalculatedOrderController {
  constructor(
    private readonly calculatedOrderService: CalculatedOrderService,
  ) {}
  @ApiOperation({
    summary: 'Create Calculated Order',
    description:
      'Create a Calculated Order given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateCalculatedOrderDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Calculated Order.',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'When an attempt to perform this Business Process was executed but for some reason could not be completed given the data provided.',
  })
  @Post()
  public async createCalculatedOrder(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateCalculatedOrderDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderDto[],
  ) {
    return await this.calculatedOrderService.createCalculatedOrder(body);
  }

  @ApiOperation({
    summary: 'Get Calculated Order',
    description: 'Fetch a created Calculated Order',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Calculated Order Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getCalculatedOrder(id: string) {
    return await this.calculatedOrderService.getCalculatedOrder(id);
  }

  @ApiOperation({
    summary: 'Update Calculated Order',
    description:
      'Update an instance by the provided Id and Calculated Order Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateCalculatedOrderDto,
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
    description: 'An example ID of a Calculated Order',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateCalculatedOrder(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateCalculatedOrderDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateCalculatedOrderDto,
  ) {
    return await this.calculatedOrderService.updateCalculatedOrder(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Calculated Order',
    description: 'Delete a Calculated Order with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Calculated Order',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Calculated Order instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAdOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.calculatedOrderService.deleteCalculatedOrder(id);
  }

  @ApiOperation({
    summary: 'Fetch Calculated Order(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listCalculatedOrder() {
    return await this.calculatedOrderService.listCalculatedOrder();
  }
}
