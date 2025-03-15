import { Region } from "src/modules/region/entities/region.entity";
import { User } from "src/modules/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // ชื่อจังหวัด

 @ManyToOne(() => Region, (region) => region.provinces, { onDelete: 'CASCADE' })
region: Region;
}
