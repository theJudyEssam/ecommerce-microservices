import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose"; // 1. Import mongoose module
import { User} from "./models/user.schema"; // 2. Import user schema


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: User }]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}