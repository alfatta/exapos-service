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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { BaseQueryDto } from 'src/shared/dto/base-query.dto';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Query() query: BaseQueryDto) {
    const data = await this.categoryService.findAll(query);
    const meta = await this.categoryService.getMeta(query);
    return { data, meta };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.categoryService.findOne(id);
    return { data };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() rawData: CategoryDto) {
    const response = await this.categoryService.create(rawData);
    const data = await this.categoryService.findOne(response.id);
    return { data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() rawData: CategoryDto) {
    const data = await this.categoryService.update(id, rawData);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.categoryService.remove(id);
    return { data };
  }
}
