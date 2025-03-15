import { ROLE_ENUM } from "src/enums/role.enum";
import { STARUS_ENUM } from "src/enums/user_status.enums";

export interface IUser{
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone_number?: string;
    adress?: string;
    profile_image?: string;
    nickname?: string;
    role_ENUM: ROLE_ENUM;
    status: STARUS_ENUM;
}

export interface ILogin {
    email: string;
    password: string;
  }
  