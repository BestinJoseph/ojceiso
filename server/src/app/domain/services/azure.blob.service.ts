import { Injectable } from "@nestjs/common";
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob'
import { v4 as uuid } from "uuid";

@Injectable()
export class AzureBlobService {
    private readonly azureConnection = process.env.AZ_CONNECTION_STRING
    containerName="file"

    public getBlobClient(imageName: string): BlockBlobClient {
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection)
        const containerClient = blobClientService.getContainerClient(this.containerName)
        const blobClient = containerClient.getBlockBlobClient(imageName)
        return blobClient
    }

    public async uploadProfilePic(file: Express.Multer.File, containerName: string) {
        this.containerName = containerName
        const blobClient = this.getBlobClient(uuid() + "_" + file.originalname)
        const updatedBlob = await blobClient.uploadData(file.buffer)
        return blobClient.url
    }
}