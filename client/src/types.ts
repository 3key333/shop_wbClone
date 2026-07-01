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