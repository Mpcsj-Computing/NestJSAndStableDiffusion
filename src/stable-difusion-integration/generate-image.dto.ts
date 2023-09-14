import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class GenerateImageDto{
    @IsString()
    @IsNotEmpty()
    prompt:string


    @IsString()
    @IsOptional()
    negativePrompt?:string
    

    @IsNumber()
    @IsOptional()
    imageWidth?:number = 512

    @IsNumber()
    @IsOptional()
    imageHeight?:number = 512
}