import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Query,
    NotFoundException,
    Delete,
    } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUserDto';
import { MessagePattern } from '@nestjs/microservices';


@Controller('app/users')
export class UserController {
    constructor(private userService: UserService) {}

    @MessagePattern({cmd:'get_all_users'})
    async getAllUsers() {
        const allUsers = await this.userService.getAllUsers();
        return allUsers;
    }

    @MessagePattern({cmd:'get_user_by_id'})
    async getUser(@Param('id') id: string) {
        const user = await this.userService.getUser(id);
        if (!user) throw new NotFoundException('User does not exist!');
        return user;
    }


    @MessagePattern({cmd:'get_user_by_email'})
    async getUserByEmail(@Param('email') email:string) {
        const user = await this.userService.getUserByEmail(email)
        if(!user) throw new NotFoundException('User not found')
        return user;
    }

    @MessagePattern({cmd:'add_user'})
    async addUser(@Body() createUserDTO: createUserDto) {
        const user = await this.userService.addUser(createUserDTO);
        return user;
    }

    @MessagePattern({cmd:'delete_user'})
    async deleteUser(@Param('id') id: string) {
        const deletedUser = await this.userService.deleteUser(id);
        if (!deletedUser) throw new NotFoundException('User does not exist!');
        return deletedUser;
    }

    @MessagePattern({cmd:'update_user'})
    async updateUser(
        @Param('id') id: string,
        @Body() createUserDTO: createUserDto,
    ) {
        const updatedUser = await this.userService.updateUser(
    
      id,
        createUserDTO,
        );
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return updatedUser;
    }

}
