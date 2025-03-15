import { IsEnum, IsNotEmpty, IsOptional, IsNumber, IsString, IsArray } from 'class-validator';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';
import { Column } from 'typeorm';

export class CreateOfferDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  from_user_id: number;

  @IsNotEmpty()
  to_user_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(OFFER_STATUS_ENUM)
  status?: OFFER_STATUS_ENUM;

  @Column({
    type: 'enum',
    enum: ['IN_PERSON', 'REMOTE'],
    nullable: true, // Allow null values
  })
  deliveryType?: 'IN_PERSON' | 'REMOTE';
  

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // ตรวจสอบให้แต่ละค่าภายใน array เป็น string
  image?: string[];  // รองรับหลายไฟล์

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

