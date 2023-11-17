import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string
}
