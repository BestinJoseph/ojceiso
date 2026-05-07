import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Repository } from 'typeorm';
import { Attendee } from './entities/attendee.entity';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training) private readonly trainingRepository: Repository<Training>,
        @InjectRepository(Attendee) private readonly attendeeRepository: Repository<Attendee>,
    ){}
    
    async create(createTrainingDto: CreateTrainingDto) {
        return await this.trainingRepository.save(createTrainingDto);
    }

    async findAll() {
        return await this.trainingRepository.find({ relations: { attendees: { profile: true } } });
    }

    async findOne(id: string) {
        return await this.trainingRepository.findOneOrFail({ where: { id }, relations: { department: true, attendees: { profile: true } } });
    }

    async update(id: string, updateTrainingDto: UpdateTrainingDto) {
        console.log(id, updateTrainingDto) 
        return await this.trainingRepository.update(id, { ...updateTrainingDto });
    }

    async createattendee( createAttendeeDto: CreateAttendeeDto ) {
        return await this.attendeeRepository.save(createAttendeeDto);
    }

    async removeattendee( attendee: Attendee ) {
        return await this.attendeeRepository.remove(attendee);
    }

    remove(id: number) {
        return `This action removes a #${id} training`;
    }
}
