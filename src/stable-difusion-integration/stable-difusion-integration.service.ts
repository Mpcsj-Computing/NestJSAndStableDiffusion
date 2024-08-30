import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  GenerateImageDto,
  GenerateImageFromPromptDto,
} from './generate-image.dto';
import { getDataFolderPath, persistData } from '../utils/file.utils';
import FormData from 'form-data';

const STABLE_DIFUSION_ULTRA_MODEL_URL =
  'https://api.stability.ai/v2beta/stable-image/generate/ultra';

@Injectable()
export class StableDifusionIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async generateImageWithUltraModel(input: GenerateImageFromPromptDto) {
    console.log('generateImageWithUltraModel>>', {
      prompt: input.prompt,
    });

    const payload = {
      prompt: input.prompt,
      output_format: 'png',
    };

    // Convert payload to FormData
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Make the POST request
    const data = await firstValueFrom(
      this.httpService.post(STABLE_DIFUSION_ULTRA_MODEL_URL, formData, {
        validateStatus: () => true, // Equivalent to `validateStatus: undefined`
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          Accept: 'image/*',
          ...formData.getHeaders(), // Set the correct form-data headers
        },
        data: formData.getBuffer(), // Ensure the data is a Buffer
      }),
    );

    // const data = await lastValueFrom(response);
    const filePath = `${getDataFolderPath()}/${Date.now()}.png`;
    persistData(Buffer.from(data.data), filePath);

    console.log(filePath);
    return filePath;
  }

  async generateImage(generateImage: GenerateImageDto) {
    const engineId = 'stable-diffusion-512-v2-0';

    const prompts: any[] = [
      {
        text: generateImage.prompt,
        weight: 1,
      },
    ];

    if (generateImage.negativePrompt) {
      prompts.push({
        text: generateImage.negativePrompt,
        weight: -1,
      });
    }
    const result = await this.httpService.post(
      `https://api.stability.ai/v1beta/generation/${engineId}/text-to-image`,
      {
        cfg_scale: 7,
        clip_guidance_preset: 'FAST_BLUE',
        height: generateImage.imageHeight,
        width: generateImage.imageWidth,
        samples: 1,
        steps: 50,
        text_prompts: prompts,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'image/png',
          Authorization: process.env.API_KEY,
        },
        responseType: 'arraybuffer',
      },
    );

    const data = await lastValueFrom(result);
    const filePath = `${getDataFolderPath()}/${Date.now()}.png`;
    persistData(Buffer.from(data.data), filePath);

    console.log(filePath);
    return filePath;
  }
}
