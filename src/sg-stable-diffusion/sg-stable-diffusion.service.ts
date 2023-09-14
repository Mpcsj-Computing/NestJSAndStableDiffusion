import { Injectable } from '@nestjs/common';
import {
    SageMakerRuntimeClient,
    InvokeEndpointCommand,
    InvokeEndpointCommandInput,
  } from '@aws-sdk/client-sagemaker-runtime';
import { SgStableDiffusionRequestDTO } from './model/sg-stable-diffusion-request.dto';
import { getUniqueFilePath, persistData } from 'src/utils/file.utils';

const ENDPOINT_NAME = 'jumpstart-dft-stable-diffusion-v2-1-base-v4';

interface OutputResult {
    generated_images: string[];
    prompt: string;
}

@Injectable()
export class SgStableDiffusionService {
    private readonly sageMakerRuntime:SageMakerRuntimeClient

    constructor(){
        this.sageMakerRuntime = new SageMakerRuntimeClient({region:"us-east-1"})
    }

    async generateImage(data:SgStableDiffusionRequestDTO){

        const input:InvokeEndpointCommandInput = {
            EndpointName:ENDPOINT_NAME,
            Body:data.toString(),
            ContentType:"application/json",
            Accept:"application/json;jpeg"
        }

        const command = new InvokeEndpointCommand(input)
        const response = await this.sageMakerRuntime.send(command)
        
        const buffer1 = Buffer.from(response.Body)
        const parsedBody = JSON.parse(buffer1.toString("utf-8")) as OutputResult

        const outputFilePath = getUniqueFilePath(".jpeg")

        const imageBuffer = Buffer.from(parsedBody.generated_images[0],'base64')
        persistData(imageBuffer,outputFilePath)

        return outputFilePath
    }
}
