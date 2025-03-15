export interface IChat{
    id: number;
    from_user_id: number;
    to_user_id: number;
    message: string;
    productId: number;
    deliveryType: 'IN_PERSON' | 'REMOTE';

}