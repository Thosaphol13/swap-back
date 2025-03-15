export interface ICommented {
    id: number;
    user_id: number;
    product_id: number;
    content: string;
    parent_id?: number; // Optional, only used for replies
}
