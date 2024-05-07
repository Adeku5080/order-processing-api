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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import Joi from 'joi';
import { ErrorResponseDto } from 'src/error-response.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { UpdateBrandDto } from './dto/update-brand.dto';

@RouteGlobalDocumentationDecorator('Brand')
@Controller()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @ApiOperation({
    summary: 'Create Brand',
    description: 'Create a Brand given the name provided in the body',
  })
  @ApiBody({
    description: 'An object of the shape defined by the specified type.',
    type: CreateBrandDto,
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Successfully created a Brand.',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'When an attempt to perform this Business Process was executed but for some reason could not be completed given the data provided.',
  })
  @Post()
  public async createBrand(
    @Body(
      new ValidationPipe({ transform: true }),
      new ParseArrayPipe({ items: CreateBrandDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    body: CreateOrderDto[],
  ) {
    return await this.brandService.createBrand(body);
  }

  @ApiOperation({
    summary: 'Get Brand',
    description: 'Fetch a created Brand',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @ApiQuery({
    name: 'Id',
    description: 'The ID of an Brand Instance',
    required: false,
    type: String,
  })
  @Get(':id')
  public async getBrand(id: string) {
    return await this.brandService.getBrand(id);
  }

  @ApiOperation({
    summary: 'Update Brand',
    description: 'Update an instance by the provided Id and Brand Id.',
  })
  @ApiBody({
    description: 'The new changes to be made in the expected Data Structure.',
    type: UpdateBrandDto,
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
    description: 'An example ID of a Brand',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async updateBrand(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
    @Body(
      new ValidationPipe(),
      new ParseArrayPipe({ items: UpdateBrandDto }),
      new JoiValidationPipe(Joi.array().items().min(1)),
    )
    changes: UpdateBrandDto,
  ) {
    return await this.brandService.updateBrand(id, changes);
  }

  @ApiOperation({
    summary: 'Delete Brand',
    description: 'Delete a Brand with the provided ID',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted Brand',
    isArray: false,
  })
  @ApiUnprocessableEntityResponse({
    description:
      'Something happened while completing the Business Process given the data provided.',
    type: () => ErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'An example ID of a Brand instance',
    example: '9070db12-571b-4374-8d42-01ff47a724b5',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteAddOn(
    @Param('id', new JoiValidationPipe(Joi.string().uuid().required()))
    id: string,
  ) {
    return await this.brandService.deleteBrand(id);
  }

  @ApiOperation({
    summary: 'Fetch Brand(s)',
    description:
      'Fetch a list containing Vehicle Insurance Cost filtered by query parameter',
  })
  @ApiOkResponse({
    description: 'Success!',
    isArray: true,
  })
  @Get()
  public async listBrand() {
    return await this.brandService.listBrand();
  }
}
