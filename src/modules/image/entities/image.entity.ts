import { Product } from 'src/modules/products/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // @ManyToOne(() => Product, (product) => product.images)
  // product: Product;
}
