import { Test, TestingModule } from '@nestjs/testing';
import { StableDifusionIntegrationController } from './stable-difusion-integration.controller';
import { HttpModule } from '@nestjs/axios';
import { StableDifusionIntegrationService } from './stable-difusion-integration.service';

describe('StableDifusionIntegrationController', () => {
  let controller: StableDifusionIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[StableDifusionIntegrationService],
      controllers: [StableDifusionIntegrationController],
      imports:[HttpModule]
    }).compile();

    controller = module.get<StableDifusionIntegrationController>(StableDifusionIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
