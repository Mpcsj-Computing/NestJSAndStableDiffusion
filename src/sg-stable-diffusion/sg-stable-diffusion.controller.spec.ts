import { Test, TestingModule } from '@nestjs/testing';
import { SgStableDiffusionController } from './sg-stable-diffusion.controller';

describe('SgStableDiffusionController', () => {
  let controller: SgStableDiffusionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SgStableDiffusionController],
    }).compile();

    controller = module.get<SgStableDiffusionController>(SgStableDiffusionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
