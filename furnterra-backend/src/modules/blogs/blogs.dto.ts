import { IsArray, IsOptional, IsString } from "class-validator";

export class BlogDto {
    @IsString()
    name: string

    @IsString()
    content: string

    @IsArray()
    @IsOptional()
    images?: string[];
}