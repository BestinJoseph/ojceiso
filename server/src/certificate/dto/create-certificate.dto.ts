import { Image } from "src/image/entities/image.entity"

export class CreateCertificateDto {
    ref: string
    name: string
    activatedon: string
    expirydate: string
    doc: Image
}
