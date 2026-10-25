import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
	constructor( @InjectRepository(Request) private readonly requestRepository: Repository<Request> ){}

	async create(createRequestDto: CreateRequestDto): Promise<Request | undefined | { success: boolean, message: string }> {
		try {
			return await this.requestRepository.save(createRequestDto)
		} catch (err) {
			return { success: false, message: "some error" }
		}
	}

	async findAll() {
		try {
			return await this.requestRepository.find({ relations: { requestedTo: true, }, select: { requestedTo: { name: true, symbol: true, id: true }} })
		} catch (err) {
			return { success: false, message: "some error" }
		}
	}

	async findOne(id: any) {
		return await this.requestRepository.findOneOrFail({ where: {id}});
	}

	update(id: number, updateRequestDto: UpdateRequestDto) {
		return `This action updates a #${id} request`; 
	}

	remove(id: number) {
		return `This action removes a #${id} request`;
	}
}
