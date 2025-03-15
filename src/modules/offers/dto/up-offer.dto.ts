import { IsEnum, IsOptional } from 'class-validator';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';


export class UpdateOfferDto {
  @IsEnum(OFFER_STATUS_ENUM)
  @IsOptional()
  status?: OFFER_STATUS_ENUM;

  @IsEnum(['IN_PERSON', 'REMOTE'], { message: 'deliveryType must be either IN_PERSON or REMOTE' })
  @IsOptional()
  deliveryType?: 'IN_PERSON' | 'REMOTE';
}
