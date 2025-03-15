// import { Province } from "src/modules/province/entities/province.entity";
import { Subdistrict } from "src/modules/subdistrict/entities/subdistrict.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  districtCode: number; // Unique column

  @Column()
  name: string;

  // @ManyToOne(() => Province, (province) => province.districts)
  // @JoinColumn({ name: 'provinceid', referencedColumnName: 'provinceCode' })
  // provinceid: Province;

  @OneToMany(() => Subdistrict, (subdistrict) => subdistrict.district)
  subdistricts: Subdistrict[]; // Updated relationship
}