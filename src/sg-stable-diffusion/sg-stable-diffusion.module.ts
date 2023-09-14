import { Module } from '@nestjs/common';
import { SgStableDiffusionController } from './sg-stable-diffusion.controller';
import { SgStableDiffusionService } from './sg-stable-diffusion.service';

@Module({
  controllers: [SgStableDiffusionController],
  providers: [SgStableDiffusionService]
})
export class SgStableDiffusionModule {}
