import { PRODUCT_STATUS_ENUM } from "src/enums/product_status.enum";

export interface IProduct {
    id: number;
    user_id: number;
    price: number;
    name: string;
    description: string;
    categoriId: number;
    status: PRODUCT_STATUS_ENUM;
    image: string;
    
}