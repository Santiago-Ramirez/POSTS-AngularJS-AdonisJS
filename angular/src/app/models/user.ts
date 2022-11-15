export interface User {
    username:string;
    email:string;
    password:string;
}
export interface User2 {
    email:string;
    password:string;
}
interface Token {
    token: string
}

export interface TokenPaylaod {
    id: number
    username: string
    password: string
}