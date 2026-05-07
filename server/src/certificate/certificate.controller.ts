import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, UploadedFile, NotFoundException } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { storage } from 'src/config/storage.config';
import { Certificate } from './entities/certificate.entity';
import { Repository } from 'typeorm';

@Controller('certificate')
export class CertificateController {
    constructor(
        private readonly certificateService: CertificateService, 
        private readonly imageService: ImageService,
        @InjectRepository(Certificate) private readonly certificateRepository: Repository<Certificate>,
    ) {}

    @UseInterceptors(FileInterceptor('certificate', { storage }))
    // @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createCertificateDto: CreateCertificateDto, @UploadedFile() doc: Express.Multer.File ) {
        const lastcert = await this.certificateRepository.find({ order: { ref: 'DESC'}, take: 1})
        // console.log(lastcert)
        createCertificateDto.ref = lastcert.length > 0 ? `OJCE-CERT-${ (parseInt(lastcert[0].ref?.split('-')[2]) + 1).toString().padStart(3, "0")}` : "OJCE-CERT-001"
        const image = await this.imageService.createDoc({ pathname: doc.filename})
        if(image) {
            createCertificateDto.doc = image
            console.log(createCertificateDto)
            return await this.certificateService.create(createCertificateDto);
        }
        throw new NotFoundException("Failed to create certificate.")
    }

    @Get()
    async findAll() {
        return await this.certificateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.certificateService.findOneWithExpiredDoc(id);
    }

    @UseInterceptors(FileInterceptor('certificate', { storage }))
    // @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateCertificateDto: UpdateCertificateDto) {
        // console.log(updateCertificateDto) 
        const { doc, ...certificate } = await this.certificateService.findOne(id)
        await this.certificateService.update(id, { doc: null });
        const image = await this.imageService.createDoc({ pathname: file.filename })
        const upCertiface = { ...certificate, activatedon: updateCertificateDto.activatedon, expirydate: updateCertificateDto.expirydate, doc: image }
        const updatedCert = await this.certificateService.update(id, { ...upCertiface });
        if(updatedCert && doc !== null ) {
            await this.imageService.update(doc.id, { expiredcerificate: certificate })
        }
        return await this.certificateService.findOneWithExpiredDoc(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const cert = await this.certificateRepository.findOne({ where: { id }})
        return await this.certificateRepository.remove(cert);
    }
}
