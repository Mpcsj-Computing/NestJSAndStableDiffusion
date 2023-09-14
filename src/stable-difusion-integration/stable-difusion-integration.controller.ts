import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { GenerateImageDto } from './generate-image.dto';
import { StableDifusionIntegrationService } from './stable-difusion-integration.service';

@Controller('stable-difusion-integration')
export class StableDifusionIntegrationController {
    constructor(private readonly service:StableDifusionIntegrationService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async generateImage(@Body() data:GenerateImageDto,@Res() res: any){
        const filePath = await this.service.generateImage(data)
        const file = createReadStream(filePath)
        file.pipe(res)
    }
}
