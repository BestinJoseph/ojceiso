import { Injectable } from "@nestjs/common";
import { FileAzureServices } from './file.azure.services'
import { uuid } from 'uuidv4'

@Injectable()
export class UploadAzureServices {
    constructor(private readonly fileService: FileAzureServices) {}

    
}