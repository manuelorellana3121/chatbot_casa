import { IsNotEmpty, IsString } from "class-validator";

export class FlowChatDto {
    @IsNotEmpty()
    @IsString()
    instruction: string
}
