import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { SgStableDiffusionService } from './sg-stable-diffusion.service';
import { SgStableDiffusionRequestDTO } from './model/sg-stable-diffusion-request.dto';
import { createReadStream } from 'fs';

@Controller('sg-stable-diffusion')
export class SgStableDiffusionController {
  constructor(private readonly service: SgStableDiffusionService) {}

  @Post('')
  async generateImage(
    @Body(new ValidationPipe({ transform: true }))
    data: SgStableDiffusionRequestDTO,
    @Res() res: any,
  ) {
    const imagePath = await this.service.generateImage(data);
    const file = createReadStream(imagePath);
    file.pipe(res);
  }
}
