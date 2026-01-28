import { Injectable } from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./models/user.schema";
import {createUserDto} from "./dto/createUserDto";
import {NotFoundException} from "@nestjs/common";


@Injectable()
export class UserService {
    constructor(
        @InjectModel("E-Commerce_Users")
        private readonly userModel: Model<UserDocument>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('User does not exist!');
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
    }

    async addUser(createUserDto: createUserDto): Promise<User> {
        const newUser = await this.userModel.create(createUserDto);
        return newUser.save();
    }

    async updateUser(
        id: string,
        createUserDto: createUserDto,
    ): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            createUserDto,
            { new: true },
        ).exec();
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return updatedUser;
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) throw new NotFoundException('User does not exist!');
        return deletedUser;
    }
}