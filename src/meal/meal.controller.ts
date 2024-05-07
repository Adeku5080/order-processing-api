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
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import Joi from 'joi';
import { ErrorResponseDto } from 'src/error-response.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { UpdateMealDto } from './dto/update-meal.dto';

@RouteGlobalDocumentationDecorator('Meal')
@Controller()
export class MealController {
  constructor(private readonly mealService: MealService) {}
  @ApiOperation({
    summary: 'Create Meal',
    description: 'Create a Meal given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateMealDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Meal.',
  })
  @Post()
  public async createMeal(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateOrderDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderDto[],
  ) {
    return await this.mealService.createMeal(body);
  }

  @ApiOperation({
    summary: 'Get Meal',
    description: 'Fetch a created Meal',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Meal Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getMeal(id: string) {
    return await this.mealService.getMeal(id);
  }

  @ApiOperation({
    summary: 'Update Meal',
    description: 'Update an instance by the provided Id and Meal Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateMealDto,
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
    description: 'An example ID of a Meal',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateMeal(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateMealDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateMealDto,
  ) {
    return await this.mealService.updateMeal(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Meal',
    description: 'Delete a Meal with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Meal',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Meal instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAdOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.mealService.deleteMeal(id);
  }

  @ApiOperation({
    summary: 'Fetch Meal(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listMeal() {
    return await this.mealService.listMeal();
  }
}
