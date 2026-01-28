import { Controller, BadRequestException, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {MessagePattern, Payload} from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { RegisterRequestDto } from "./dtos/registerRequestDto";
import { RegisterResponseDto } from "./dtos/RegisterResponseDto";
import { LoginResponseDto } from "./dtos/LoginResponseDto";
import { Public } from "./decorators/public.decorator";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(AuthGuard('local'))
    @MessagePattern({cmd: 'login'})
    async login(@Request() req): Promise<LoginResponseDto | BadRequestException> {
        return this.authService.login(req.user);
    }
    

    @Public()
    @MessagePattern({cmd:'register'})
    async register(
        @Payload() registerBody: RegisterRequestDto,
    ): Promise<RegisterResponseDto | BadRequestException> {
        return await this.authService.register(registerBody);
    }

}