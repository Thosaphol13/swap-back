import { Province } from "src/modules/provinces/entities/province.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Province, (province) => province.region)
  provinces: Province[];
}