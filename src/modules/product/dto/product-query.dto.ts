import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/base-query.dto';

export class ProductQueryDto extends BaseQueryDto {
  @ApiProperty({ example: '', default: '', required: false })
  @IsOptional()
  @IsString()
  categoryId: string;
}
