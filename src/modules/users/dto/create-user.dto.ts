import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ROLE_ENUM } from 'src/enums/role.enum';
import { STARUS_ENUM } from 'src/enums/user_status.enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;  // Ensure this is included and validated

  @IsString()
  address: string;

  // regionId?: number; // เลือกภาคได้ (optional)

  // provinceId?: number;

  @IsOptional() // Optional because the role can default to 'user'
  @IsString()
  role?: ROLE_ENUM = ROLE_ENUM.USER;
  
  @IsOptional() // Optional because the role can default to 'user'
  @IsString()
  status?: STARUS_ENUM = STARUS_ENUM.ON;

  @IsOptional()
  @IsString()
  profilePicture?: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

}
