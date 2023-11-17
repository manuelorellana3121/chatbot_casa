import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateProfileDto {
    @IsString()
    fullName: string;

    @IsString()
    bio?: string;

    mobile?: string

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    createdAt?: string | Date
    updatedAt?: string | Date
}
