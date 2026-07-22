import { Body, Controller, Get, NotAcceptableException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { updateRefreshUsersDto } from './dto/update-refresh-users.dto';
import { UpdateUserRolesDto } from './dto/update-users-roles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { Personal } from 'src/profile/entities/personal.entity';
import { Users } from './entities/users.entity';
import { error } from 'console';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorators';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userServices: UsersService,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
        @InjectRepository(Personal) private readonly personaRepository: Repository<Personal>
    ) {}

    @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async create(@Body() createUserDto: CreateUserDto ) { 
        const { ...user} = createUserDto
        try {
            const existUser = await this.userServices.findByUsername(createUserDto.username)
            if(existUser) {
                throw new NotAcceptableException("Username already available.")
            }
            const personal = await this.personaRepository.save({})
            const profile = await this.profileRepository.save({ personal, name: createUserDto.name })
            const createUser = { ...createUserDto, profile }
            return await this.userServices.create(createUser)
        } catch (err) {
            return err
        }
    } 

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Req() req: any) {
        return await this.userServices.findProfileByUsername(req.user.username)
    }

    @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Patch(':id/:target')
    async updateUserRoles(@Param('id') id: string, @Param('target') target: string, @Req() req: any, @Body() updateUserRolesDto: UpdateUserRolesDto) {
        // console.log(updateUserRolesDto.roles === 'MANAGER')
        // console.log(id, updateUserRolesDto)
        console.log(target, id)
        const userExist = await this.userRepository.findOneByOrFail({ id: id })
        if(id === undefined) return { status: 401, error: { message: 'undefined id' }}
        if( userExist.roles === 'SUPER' || updateUserRolesDto.roles === 'SUPER' ) return { status: 401, error: { message: 'Cant change the role.' }}
        return await this.userServices.updateUserRoleBranchById(id, updateUserRolesDto)
    }

    @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers(@Req() req: any) {
        return await this.userServices.find()
    }
}
