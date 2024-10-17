import { Category } from 'src/modules/category/entities/category.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  constructor(entity: Partial<Product>) {
    super();
    Object.assign(this, entity);
  }

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string | null;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
