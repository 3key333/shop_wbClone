export interface IUserEntity {
    id?: string;
    name: string;
    password_hash?: string;
    role: string | null;
}