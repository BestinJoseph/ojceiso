import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(Image) private readonly docsRepository: Repository<Image>){}

    async createDoc(createImageDto: CreateImageDto): Promise<Image> {
        return await this.docsRepository.save(createImageDto);
    }

    async createDocs(createImageDto: CreateImageDto) {
        return await this.docsRepository.save(createImageDto);
    }

    async findAll() {
        return await this.docsRepository.find({ relations: { expiredcerificate: true }});
    }

    findOne(id: number) {
        return `This action returns a #${id} image`;
    }

    async update(id: string, updateImageDto: UpdateImageDto) {
        return await this.docsRepository.update(id, { ...updateImageDto });
    }

    remove(id: number) {
        return `This action removes a #${id} image`;
    }
}
