import { Test, TestingModule } from '@nestjs/testing';
import { SgStableDiffusionService } from './sg-stable-diffusion.service';

describe('SgStableDiffusionService', () => {
  let service: SgStableDiffusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SgStableDiffusionService],
    }).compile();

    service = module.get<SgStableDiffusionService>(SgStableDiffusionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
