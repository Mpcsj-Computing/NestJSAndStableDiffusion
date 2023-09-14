import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class SgStableDiffusionRequestDTO{
    
    @IsString()
    @IsNotEmpty()
    prompt:string

    @IsNumber()
    @IsOptional()
    seed:number=100


    @IsNumber()
    @IsNotEmpty()
    width:number=512

    @IsNumber()
    @IsNotEmpty()
    height:number=512


    toJson(){
        return JSON.parse(this.toString())
    }
    toString(){
        return JSON.stringify(this)
    }
}