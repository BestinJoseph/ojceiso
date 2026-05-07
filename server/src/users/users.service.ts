import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt'
import { updateRefreshUsersDto } from './dto/update-refresh-users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserRolesDto } from './dto/update-users-roles.dto';
import { Role } from './enums/role.enum';
import { Profile } from 'src/profile/entities/profile.entity';

// export type User = {
//   userId: number;
//   username: string;
//   password: string;
// }; 

@Injectable()
export class UsersService { 
    constructor( 
        @InjectRepository(Users) 
        private readonly userRepository: Repository<Users>, configService: ConfigService ) {}

    async create(createUserDto: CreateUserDto): Promise<Users | undefined | { success: boolean, message: string }> {
        try {
            const hashPassword = await bcrypt.hash(createUserDto.password, 10)
            const { ...hPUser } = { ...createUserDto, password: hashPassword }
            return await this.userRepository.save(hPUser)
        } catch (err) {
            return { success: false, message: err.message }
        }
    }

    async find(): Promise<Users[]> {
        return await this.userRepository.find({ relations: { profile: { personal: true, department: true, positions: true, educations: true } }, select: { id: true, username: true, roles: true, branch: true, active: true, }})
    }

    async findOne(username: string): Promise<Users | undefined> {
        return this.userRepository.findOneBy({ username });
    }

    async findByUsername(username: string): Promise<Users | undefined> {
        return await this.userRepository.findOneBy({ username });
    }

    async findByUsernameDep(username: string): Promise<Users | undefined> {
        return await this.userRepository.findOneOrFail({ where: { username }, relations: { profile: { department: { profile: { user: true } }} }, select: { username: true, id: true, roles: true, branch: true, profile: { id: true, name: true, position: true, department: { id: true, name: true, profile: { id: true, name: true, position: true, user: { id: true, username: true, branch: true } }} }}});
    }

    async findProfileByUsername(username: string): Promise<Users | undefined> {
        return await this.userRepository.findOneOrFail({ where: {username}, select: { id: true, username: true }, relations: { profile: true }});
    }

    async updateRefreshToken(username: string, updateRefreshToken: updateRefreshUsersDto) {
        try {
            return await this.userRepository.update( { username: username }, updateRefreshToken )
        } catch (err) {
            return { error: err.message }
        }
    }

    // async getUserIfRefreshTokenMatches(username: string) {
    //     const user = await this.userRepository.findOneBy({ username })
    //     const isNotRefreshTokenExpired = this.jwtService.verify(user.refreshToken)
    //     console.log(isNotRefreshTokenExpired)
    // }

    async updateUserRoleBranchById(id: string, updateUserRole: UpdateUserRolesDto) {
        console.log(updateUserRole)
        try {
            const user = await this.userRepository.findOneBy({ id: id })
            if(user) {
                await this.userRepository.update({ username: user.username}, updateUserRole)
            }
        } catch (error) {
            return { status: 401, error: error.message }
        }
    }

    // async updateUserRoleBranchById(id: string, updateUserRole: UpdateUserRolesDto) {
    //     try {
    //         const user = await this.userRepository.findOneBy({ id: id })
    //         if(user) {
    //             await this.userRepository.update({ username: user.username}, updateUserRole)
    //         }
    //     } catch (error) {
    //         return { status: 401, error: error.message }
    //     }
    // }

    async updateUserRolesByUsername(username: string, updateUserRoles: UpdateUserRolesDto) {
        try {
            const user = await this.userRepository.findOneBy({ username })
            let existRoles = Role
            if(user) {
                // if(updateUserRoles?.roles?.length <= 0) return { status: 400, message: "Already exist", success: false, error: true }
                await this.userRepository.update( {username: username}, updateUserRoles )
                return { status: 200, message: "updated", success: true, error: false }
            }
        } catch (err) {
            return { error: err.message }
        }
    }

    async validateJwtUser(userId: string) {
        const user = await this.userRepository.findOneOrFail({where: {id: userId}, select: { id: true, username: true, roles: true }})
        if(!user) throw new UnauthorizedException()
        return user
    }
}
