import { Injectable } from '@nestjs/common';
import { CreatePrequalificationDto } from './dto/create-prequalification.dto';
import { UpdatePrequalificationDto } from './dto/update-prequalification.dto';

@Injectable()
export class PrequalificationService {
  create(createPrequalificationDto: CreatePrequalificationDto) {
    return 'This action adds a new prequalification';
  }

  findAll() {
    return `This action returns all prequalification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prequalification`;
  }

  update(id: number, updatePrequalificationDto: UpdatePrequalificationDto) {
    return `This action updates a #${id} prequalification`;
  }

  remove(id: number) {
    return `This action removes a #${id} prequalification`;
  }
}
