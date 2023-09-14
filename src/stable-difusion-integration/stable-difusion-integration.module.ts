import { Module } from '@nestjs/common';
import { StableDifusionIntegrationService } from './stable-difusion-integration.service';
import { StableDifusionIntegrationController } from './stable-difusion-integration.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [StableDifusionIntegrationService],
  controllers: [StableDifusionIntegrationController]
})
export class StableDifusionIntegrationModule {}
