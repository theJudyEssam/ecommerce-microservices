import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  IsNumberString
} from 'class-validator';



export class createUserDto {
    username: string;

    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty() 
    email:string;

    @MinLength(8, {
    message: 'password too short',
    })
    password:string;

    @IsNotEmpty()
    first_name:string;

    @IsNotEmpty()
    last_name:string;

    @IsNotEmpty()
    @IsNumberString()
    phone_number:string;
    
    created_at:Date;
    updated_at:Date;
    role:string;
}