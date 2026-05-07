import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ArrayContains, Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private readonly departmentRepository: Repository<Department>) {}

    async create(createDepartmentDto: CreateDepartmentDto) {
        try {
            return await this.departmentRepository.save(createDepartmentDto);
        } catch (err) {
            return { success: false, message: err.message }
        }
    }

    async findAll() {
        return await this.departmentRepository.find({ relations: { createdBy: true }, select: { id: true, name: true, symbol: true, createdOn: true, createdBy: { id: true, username: true, } }});
    }

    async findOneById(id: string) {
        return await this.departmentRepository.findOneOrFail({ where: {id: id}, select: { id: true, name: true, symbol: true, createdOn: true } })
    }

    async findOneByName(name: string) {
        console.log(name)
        return await this.departmentRepository.findOneOrFail({ where: { name }, select: { id: true, name: true, symbol: true, createdOn: true }})
    }

    async findOneBySymbol(name: Department) {
        return await this.departmentRepository.findOneOrFail({ where: { symbol: name.symbol }, relations: { profile: { user: true }}, select: { id: true, name: true, profile: { id: true, position: true, name: true, user: { id: true, username: true, branch: true } } }});
    }

    update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
        return `This action updates a #${id} department`;
    }

    remove(id: number) {
        return `This action removes a #${id} department`;
    }
}
