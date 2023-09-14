import { Test, TestingModule } from '@nestjs/testing';
import { StableDifusionIntegrationService } from './stable-difusion-integration.service';
import { HttpModule } from '@nestjs/axios';

describe('StableDifusionIntegrationService', () => {
  let service: StableDifusionIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StableDifusionIntegrationService],
      imports:[HttpModule]
    }).compile();

    service = module.get<StableDifusionIntegrationService>(StableDifusionIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
