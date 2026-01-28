import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterRequestDto } from './dtos/registerRequestDto';
import {User} from 'src/user/models/user.schema';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<User> {
        const users = await this.userService.getAllUsers();
        const user = users.find(user => user.username === username);
        if(!user){
            throw new BadRequestException('Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid username or password');
        }
        return user;
    }

async login(user: any) {   //! needs to change to proper type
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
        access_token: this.jwtService.sign(payload),
    };
}

async register(userDto: RegisterRequestDto) {
    const existingUser = (await this.userService.getAllUsers())
        .find(user => user.username === userDto.username || user.email === userDto.email);
    if (existingUser) {
        throw new BadRequestException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = {
        ...userDto,
        password: hashedPassword,
    };
    await this.userService.addUser(newUser);
    return this.login(newUser);
}}