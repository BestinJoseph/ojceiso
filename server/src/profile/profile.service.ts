import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Department } from 'src/department/entities/department.entity';
import { Personal } from './entities/personal.entity';
import { profile } from 'console';
import { Position } from './entities/position.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
        @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
        @InjectRepository(Personal) private readonly personalRepository: Repository<Personal>,
        @InjectRepository(Position) private readonly positionRepository: Repository<Position>
    ) {}

    async create(createProfileDto: CreateProfileDto, username: string) {
        const user = await this.usersRepository.findOneOrFail({ where: { username }})
        const findDepartment: any = createProfileDto.department
        if(user) {
            createProfileDto.user = user
        }
        const department: Department = await this.departmentRepository.findOne({ where: { name: findDepartment } })
        createProfileDto.department = department
        return await this.profileRepository.save(createProfileDto);
    }

    async findAll() {
        // console.log('profile get all')
        return await this.profileRepository.find({ relations: { user: true, positions: true, educations: true }, select: { user: { id: true, username: true }} }); 
    }

    async findOneByID(id: string) {
        return await this.profileRepository.findOne({ where: { id }, relations: { department: true, personal:  { profile: true, }, positions: true, educations: true }});
    }

    async findOneByProfileID(id: string) {
        return await this.profileRepository.findOne({where: { id }}); 
    }

    async findOneByLogin(res: any) {
        const user = await this.usersRepository.findOneOrFail({ where: { username: res.username }, relations: { profile: true }})
        if(!user.profile) throw new NotFoundException("Profile not found.")
        const profile = await this.profileRepository.findOneOrFail({ where: { id: user.profile.id }, relations: { department: true, personal: { profile: true }, positions: true, educations: true, attendee: { training: true } } });
        return profile
    }

    update(id: number, updateProfileDto: UpdateProfileDto) { 
        return `This action updates a #${id} profile`;
    }

    async updateDP(id: string, file: string, user: Users) {
        const profile = await this.profileRepository.findOneBy({ id })
        if(profile) {
            await this.profileRepository.update(id, { image: file })
            return await this.profileRepository.findOneOrFail({ where: { id }, relations: { user: true, }, select: { user: { id: true, username: true, roles: true } }})
        }
        return { status: 500, message: '', error: '' };
    }

    async updatePersonalData(id: string, data: any, user: Users) {
        const profile = await this.profileRepository.findOne({ where: {id}, relations: { user: true } })
        // console.log("nice.....................", data)
        if(profile) {
            await this.profileRepository.update(id, data)
            return await this.usersRepository.findOneOrFail({ where: { id: profile.user.id } })
        }
        return { status: 500, message: '', error: '' };
    }

    async updateProfileData(id: string, data: any, user: Users) {
        const profile = await this.profileRepository.findOne({ where: {id}, relations: { user: true } })
        // console.log("nice.....................", data)
        if(profile) {
            await this.profileRepository.update(id, data)
            return await this.usersRepository.findOneOrFail({ where: { id: profile.user.id } })
        }
        return { status: 500, message: '', error: '' };
    }

    async updateUserPersonalData(id: string, data: any, user: Users) {
        const profile = await this.profileRepository.findOneOrFail({ where: { id }, relations: { personal: true }})

        if(profile.personal) {
            await this.personalRepository.update(profile.personal.id, data)
            return await this.profileRepository.findOneOrFail({ where: { id }, relations: { user: true, personal: true }, select: { user: { id: true, username: true }} })
        }
        return { status: 500, message: '', error: '' };
    }

    async updateUserData(profile: Profile) {
        return await this.usersRepository.findOneOrFail({ where: { id: profile.user.id }, relations: { profile: { positions: true }} })
    }

    async updateProfilePosition(id: string, data: any) {
        const position = await this.positionRepository.findOne({ where: {id}, relations: { profile: { user: true }} })
        try {
            if(position) {
                const pos = await this.positionRepository.update(id, data)
                if(pos) {
                    return await this.usersRepository.findOneOrFail({ where: { id: position?.profile?.user.id } })
                }
            }
        } catch (err) {
            return err
        }
    }

    remove(id: number) {
        return `This action removes a #${id} profile`;
    }
}
