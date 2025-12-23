import { UserRole } from '../entities/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
    name?: string;
    role?: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    access_token: string;
    user: {
        id: number;
        email: string;
        name?: string;
        role: UserRole;
    };
}
