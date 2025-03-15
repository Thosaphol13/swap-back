import { District } from "src/modules/district/entities/district.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subdistrict  {
  @PrimaryGeneratedColumn()
  id: number; // Primary key

  @Column()
  name: string;

  @Column()
  subdistrictCode: number;

  @Column()
  districtid: number; // Foreign key column

  @ManyToOne(() => District, (district) => district.subdistricts)
  @JoinColumn({ name: 'districtid', referencedColumnName: 'districtCode' })
  district: District;
}