import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/storage.config';
import { ImageService } from 'src/image/image.service';
import { Department } from 'src/department/entities/department.entity';
import { DepartmentService } from 'src/department/department.service';
import { Personal } from './entities/personal.entity';
import { newEmployementDto } from './dto/new-employement.dto';
import { Employements } from './entities/employement.entity';
import { Education } from './entities/education.entity';
import { newEducationDto } from './dto/new-educations.dts';
import { AzureBlobService } from 'src/app/domain/services/azure.blob.service';
import { Users } from 'src/users/entities/users.entity';
import { Roles } from 'src/users/decorators/roles.decorators';
import { Role } from 'src/users/enums/role.enum';
import { Position } from './entities/position.entity';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService, 
        private readonly imageService: ImageService, 
        private readonly departmentService: DepartmentService,
        @InjectRepository(Personal) private readonly personalRepository: Repository<Personal>,
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
        @InjectRepository(Employements) private readonly employementRepository: Repository<Employements>,
        @InjectRepository(Education) private readonly educationRepository: Repository<Education>,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        @InjectRepository(Position) private readonly positionRepository: Repository<Position>,
        private readonly azureBlobService: AzureBlobService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createProfileDto: CreateProfileDto, @Req() req: any) {
        const personal = this.personalRepository.create()
        createProfileDto.personal = personal
        return await this.profileService.create(createProfileDto, req.username);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        // console.log('profile get all')
        return await this.profileService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findOne(@Req() res: any, ) {
        let myProfile = await this.profileService.findOneByLogin(res.user);
        if(myProfile.personal === null ) {
            const personal = await this.personalRepository.save({})
            const profile = await this.profileRepository.update(myProfile.id,{ personal })
            if(profile) {
                myProfile = await this.profileService.findOneByLogin(res.user); 
            } else {
                throw new NotFoundException("Problem updating profile.")
            }
        }
        return myProfile
    }
 
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))  
    @Patch(':PROFILE_ID/dp')
    async updateDP(@Param('PROFILE_ID') profileId: string, @Body() updateProfileDto: any, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        const dpImage = await this.azureBlobService.uploadProfilePic(file, 'files')
        // const dpImage = await this.imageService.createDoc({ pathname: file.filename})
        return await this.profileService.updateDP(profileId, dpImage, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':PROFILE_ID')
    async updatePersonal(@Param('PROFILE_ID') profileId: string, @Body() updateProfileDto: any, @Req() req: any) {
        console.log(updateProfileDto)
        try {
            const department = await this.departmentService.findOneById(updateProfileDto.department)
            console.log(department)
            if(department) {
                updateProfileDto.department = department
                return await this.profileService.updatePersonalData(profileId, updateProfileDto, req.user);
            }
        } catch (err) {
            console.log(err)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':PROFILE_ID/profile')
    async updateProfileInfo(@Param('PROFILE_ID') profileId: string, @Body() updateProfileDto: any, @Req() req: any) {
        // console.log(updateProfileDto)
        try {
            const department = await this.departmentService.findOneById(updateProfileDto.department) //.toLowerCase()
            if(department) {
                updateProfileDto.department = department
                // console.log(updateProfileDto) 
                return await this.profileService.updatePersonalData(profileId, updateProfileDto, req.user);
            }
        } catch (err) {
            console.log(err)
        }
    }

    @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Patch(':PROFILE_ID/:target')
    async updateUserProfile(@Param('PROFILE_ID') profileId: string, @Param('target') target: string, @Body() updateProfileDto: any, @Req() req: any) {
        // console.log(updateProfileDto, profileId)
        try {
            switch (target) {
                case "department":
                    const department = await this.departmentService.findOneById(updateProfileDto.department) //.toLowerCase()
                    if(department) {
                        return await this.profileService.updateProfileData(profileId, { department }, req.user);
                    }
                    break;
                case "position":
                    return await this.profileService.updateProfileData(profileId, updateProfileDto, req.user);
                case "name":
                    return await this.profileService.updateProfileData(profileId, updateProfileDto, req.user);
                default:
                    return await this.profileService.updateUserPersonalData(profileId, updateProfileDto, req.user);
            }
            if(target === "department") {
                
            } else {
                
            }
        } catch (err) {
            console.log(err)
            return err
        }
    }

    @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Patch(':PROFILE_ID/personal/:target')
    async updatePersonalInfo(@Param('PROFILE_ID') profileId: string, @Param('target') target: string, @Body() updatePersonalDto: any, @Req() req: any) {
        // console.log(profileId, updatePersonalDto, target) 
        try {
            const profile = await this.profileRepository.findOneOrFail({ where: { id: profileId }, relations: { personal: true }})
            if(profile) {
                await this.personalRepository.update( profile.personal.id, { ...updatePersonalDto })
            }
            return this.profileService.findOneByID(profileId)
        } catch (err) {
            console.log(err)
        }
    }

    // @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Patch(':PROFILE_ID/experiences/:METHOD')
    async updatePersonalEmployments(@Param('PROFILE_ID') profileId: string, @Param('METHOD') method: string, @Body() updateEmployementDto: newEmployementDto, @Req() req: any) {
        // console.log(profileId, updateEmployementDto, method)
        updateEmployementDto = { ...updateEmployementDto, end: updateEmployementDto.end === "" ? null : updateEmployementDto.end}
        try {
            const profile = await this.profileRepository.findOneOrFail({ where: { id: profileId }, relations: { user: true, positions: true }})

            if(profile) {
                const newprofile = { ...updateEmployementDto, profile, start: new Date(updateEmployementDto.start) }
                const newEmployment = await this.positionRepository.save(newprofile)
                
                if(newEmployment) {
                    const nUser = await this.profileService.updateUserData(profile)
                    if(nUser) {
                        const pos = profile.positions.find( posi => posi.end === null )
                        if(pos) {
                            const prevDate = new Date(updateEmployementDto.start).setDate(new Date(updateEmployementDto.start).getDate() - 1)
                            return await this.profileService.updateProfilePosition(pos.id, { end: new Date(prevDate) })
                        } else {
                            return nUser
                        }
                    }
                }
            }
            return this.profileService.findOneByID(profileId)
        } catch (err) {
            console.log(err)
        }
    }

    // @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Patch('position/:POSITION_ID/update')
    async updateExperience(@Param('POSITION_ID') posId: string, @Body() data: any) {
        try {
            return await this.profileService.updateProfilePosition(posId, { ...data, end: new Date(data.end)})
        } catch (err) {
            console.log(err)
        }
    }

    // @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Patch('education/:PROFILE_ID/new')
    async updatePersonalEducations(@Param('PROFILE_ID') profileId: string, @Body() newEducationDto: newEducationDto, @Req() req: any) {
        console.log(profileId, newEducationDto)
        try {
            const profile = await this.profileRepository.findOneOrFail({ where: { id: profileId }})
            if(profile) {
                const newEducation = { ...newEducationDto, profile: profile }
                await this.educationRepository.save(newEducation)
            }
            return this.profileService.findOneByID(profileId)
        } catch (err) {
            console.log(err)
        }
    }

    @Roles(Role.SUPER)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.update(+id, updateProfileDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.profileService.remove(+id);
    }
}
