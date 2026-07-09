export interface NewProduct {
    user_id: string;
    name: string;
    text: string;
    price: number;
}

export interface IProductEntity extends NewProduct {
    id: string
}