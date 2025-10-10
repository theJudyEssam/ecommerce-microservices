import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://ju:<db_password>@cluster0.8qbioua.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
