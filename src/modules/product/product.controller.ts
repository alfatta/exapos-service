import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() query: ProductQueryDto) {
    const data = await this.productService.findAll(query);
    const meta = await this.productService.getMeta(query);
    return { data, meta };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productService.findOne(id);
    return { data };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() rawData: ProductDto) {
    const response = await this.productService.create(rawData);
    const data = await this.productService.findOne(response.id);
    return { data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() rawData: ProductDto) {
    const data = await this.productService.update(id, rawData);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.productService.remove(id);
    return { data };
  }
}
