import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateImageFromPromptDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}

export class GenerateImageDto extends GenerateImageFromPromptDto {
  @IsString()
  @IsOptional()
  negativePrompt?: string;

  @IsNumber()
  @IsOptional()
  imageWidth?: number = 512;

  @IsNumber()
  @IsOptional()
  imageHeight?: number = 512;
}
