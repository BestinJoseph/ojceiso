import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificateService {
    constructor(@InjectRepository(Certificate) private readonly certificateRepository: Repository<Certificate>) {}
  
    async create(createCertificateDto: CreateCertificateDto) {
        return await this.certificateRepository.save(createCertificateDto);
    }

    async findAll() {
        return await this.certificateRepository.find({ relations: { doc: true, expired: true }});
    }

    async findOne(id: string) {
        return await this.certificateRepository.findOne({ where: { id }, relations: { doc: true } });
    }

    async findOneWithExpiredDoc(id: string) {
        return await this.certificateRepository.findOne({ where: { id }, relations: { doc: true, expired: true } });
    }

    async update(id: string, updateCertificateDto: UpdateCertificateDto) {
        await this.certificateRepository.update(id, updateCertificateDto);
        return await this.certificateRepository.findOne({ where: { id }, relations: { doc: true } })
    }

    remove(id: number) {
        return `This action removes a #${id} certificate`;
    }
}
