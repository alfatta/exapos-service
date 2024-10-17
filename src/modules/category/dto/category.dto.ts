import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 'Beverage' })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://dummyimage.com/500x500' })
  @IsOptional()
  image: string | null;
}
