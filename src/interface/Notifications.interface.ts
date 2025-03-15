import { NOTI_ENUM } from "src/enums/noti.enum";

export interface INotification{
    id: number;
    user_id: number;
    type_notification: NOTI_ENUM;
}