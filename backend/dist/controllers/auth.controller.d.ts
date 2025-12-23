import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../dto/auth.dto").AuthResponseDto>;
    login(loginDto: LoginDto): Promise<import("../dto/auth.dto").AuthResponseDto>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        name: string;
        role: import("../entities/user.entity").UserRole;
    }>;
}
