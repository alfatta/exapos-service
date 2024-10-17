import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getMeta(query: ProductQueryDto) {
    const { page = 1, perPage = 10, search, categoryId } = query;
    const count = await this.productRepo.count({
      where: {
        name: ILike(`%${search}%`),
        categoryId,
      },
    });

    return {
      page,
      perPage,
      totalData: count,
      totalPage: Math.ceil(count / perPage),
    };
  }

  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      perPage = 10,
      orderBy = 'createdAt',
      order = 'desc',
      search,
      categoryId,
    } = query;
    return this.productRepo.find({
      where: {
        name: ILike(`%${search}%`),
        categoryId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        [orderBy]: order,
      },
      relations: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const data = await this.productRepo.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    if (!data) throw new NotFoundException();
    return data;
  }

  create({ categoryId, ...rawData }: ProductDto) {
    return this.productRepo.save({ ...rawData, category: { id: categoryId } });
  }

  async update(id: string, rawData: ProductDto) {
    const data = await this.productRepo.update({ id }, rawData);
    if (!data) throw new NotFoundException();
    return this.findOne(id);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    await this.productRepo.softDelete({ id });
    return data;
  }
}
