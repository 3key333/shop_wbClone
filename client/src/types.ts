export interface IUserEntity {
    id?: string;
    name: string;
    password_hash?: string;
    role: string | null;
}

export interface NewProductForm {
    name: string;
    text: string;
    price: string;
}

export interface NewProductRequest{
    user_id: string;
    name: string;
    text: string;
    price: number;
}

export interface IProductEntity extends NewProductRequest {
    id: string;
}