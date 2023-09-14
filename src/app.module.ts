import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StableDifusionIntegrationModule } from './stable-difusion-integration/stable-difusion-integration.module';
import { ConfigModule } from '@nestjs/config';
import { SgStableDiffusionModule } from './sg-stable-diffusion/sg-stable-diffusion.module';

@Module({
  imports: [StableDifusionIntegrationModule,ConfigModule.forRoot(), SgStableDiffusionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
