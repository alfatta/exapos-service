import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { BaseQueryDto } from 'src/shared/dto/base-query.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async getMeta(query: BaseQueryDto) {
    const { page = 1, perPage = 10, search } = query;
    const count = await this.categoryRepo.count({
      where: {
        name: ILike(`%${search}%`),
      },
    });

    return {
      page,
      perPage,
      totalData: count,
      totalPage: Math.ceil(count / perPage),
    };
  }

  async findAll(query: BaseQueryDto) {
    const {
      page = 1,
      perPage = 10,
      orderBy = 'createdAt',
      order = 'desc',
      search,
    } = query;
    return this.categoryRepo.find({
      where: {
        name: ILike(`%${search}%`),
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        [orderBy]: order,
      },
    });
  }

  async findOne(id: string) {
    const data = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!data) throw new NotFoundException();
    return data;
  }

  create(rawData: CategoryDto) {
    return this.categoryRepo.save(rawData);
  }

  async update(id: string, rawData: CategoryDto) {
    const data = await this.categoryRepo.update({ id }, rawData);
    if (!data) throw new NotFoundException();
    return this.findOne(id);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    await this.categoryRepo.softDelete({ id });
    return data;
  }
}
