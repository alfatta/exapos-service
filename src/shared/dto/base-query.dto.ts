import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseQueryDto {
  @ApiProperty({ example: 1, required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number = 1;

  @ApiProperty({ example: 10, required: false })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  perPage: number = 10;

  @ApiProperty({ example: 'desc', default: 'desc', required: false })
  @IsOptional()
  @IsEnum({ asc: 'asc', desc: 'desc' })
  order: 'asc' | 'desc' = 'desc';

  @ApiProperty({ example: 'createdAt', required: false })
  @IsOptional()
  @IsString()
  orderBy: string = 'createdAt';

  @ApiProperty({ example: '', default: '', required: false })
  @IsOptional()
  @IsString()
  search: string = '';
}
