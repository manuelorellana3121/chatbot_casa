import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    user: Prisma.UserCreateInput

    // Preguntar si no puede hacerse de esta manera
    // para validar cada una de las entradas del dto por separado
    // user: {
    //     @IsEmail()
    //     email: string;
    // }

    @IsNotEmpty()
    profile: Prisma.ProfileUncheckedCreateInput
}
