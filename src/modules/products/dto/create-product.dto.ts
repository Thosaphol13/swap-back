import { IsNotEmpty, IsNumber, IsEnum, Min, IsOptional } from 'class-validator';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;


  @IsEnum(PRODUCT_STATUS_ENUM, { message: 'Invalid status value' })
  status: PRODUCT_STATUS_ENUM;

  @IsNotEmpty()
  @IsNumber()
  userId: number;  

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;  

  @IsOptional()
  @IsNumber()
  categoryWantId: number;


  image?: string[];
  // @IsOptional()
  // image?: string[];


}

