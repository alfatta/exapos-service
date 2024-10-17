import { Product } from 'src/modules/product/entities/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  constructor(entity: Partial<Category>) {
    super();
    Object.assign(this, entity);
  }

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string | null;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
