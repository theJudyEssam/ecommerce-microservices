import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose"; // 1. Import mongoose module
import { User, UserSchema} from "./models/user.schema"; // 2. Import user schema


@Module({
    imports: [
        MongooseModule.forFeature([{ name: "E-Commerce_Users", schema: UserSchema}]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],

})
export class UserModule {}