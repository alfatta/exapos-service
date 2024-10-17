import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDto {
  @ApiProperty({ example: 'Expresso' })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 25000 })
  @IsDefined()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'https://dummyimage.com/500x500' })
  @IsOptional()
  image: string | null;

  @ApiProperty({ example: '1294c76f-0349-49d0-add5-2d09cefadfb3' })
  @IsDefined()
  categoryId: string;
}
