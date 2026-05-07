import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, ConflictException } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DepartmentService } from 'src/department/department.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { ProfileService } from 'src/profile/profile.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorators';
import { Role } from 'src/users/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';
import { Repository } from 'typeorm';

@Controller('training')
export class TrainingController {
    constructor(
        private readonly trainingService: TrainingService, 
        private readonly departmentService: DepartmentService,
        private readonly profileService: ProfileService,
        @InjectRepository(Attendee) private readonly attendeeRepository: Repository<Attendee>,
    ) {}

    // @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createTrainingDto: any) {
        const department = await this.departmentService.findOneByName(createTrainingDto.department)
        if(!department) {
            throw new NotFoundException("department not found")
        }
        const newTraining: CreateTrainingDto = { ...createTrainingDto, department }
        return await this.trainingService.create(newTraining);
    }

    // @Roles(Role.IT, Role.AUDITOR, Role.ADMINISTRATOR, Role.OFFICER, Role.TECNICIAN)
    // @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.trainingService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.trainingService.findOne(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTrainingDto: any) {
        return this.trainingService.update(id, updateTrainingDto);
    } 

    // @UseGuards(JwtAuthGuard)
    @Patch(':id/attendee')
    async addattendee(@Param('id') id: string, @Body() createAttendeeDto: any) {
        try {
            const training = await this.trainingService.findOne(id)
            // console.log(training)
            if(!training) {
                throw new NotFoundException("Profile not available.")
            }
            const profile =  await this.profileService.findOneByProfileID(createAttendeeDto.profile)
            // console.log(training)
            const exist = training.attendees.find( att => att.profile === profile )
            // console.log(exist)
            if(exist) throw new ConflictException("Already registered. Thank you")
            const newAttendee = { profile, training }
            return this.trainingService.createattendee(newAttendee);
        } catch (err) {
            return err
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Post(':id/attendee')
    async addAttendee(@Param('id') id: string, @Body() bodyAttendee: any) {
        const { attendee } = bodyAttendee
        const profile = await this.profileService.findOneByID(attendee)
        const training = await this.trainingService.findOne(id)
        const es = training.attendees.some( attend => attend.profile.id === attendee )
        if(es) throw new NotFoundException("Attendee is already registered.")
        const newAttendee = await this.attendeeRepository.save({ training, profile })
        if(!newAttendee) throw new NotFoundException("Unable to create.")
        return await this.trainingService.findOne(id)
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id/attendee/:attendee')
    async removeAttendee(@Param('id') id: string, @Param('attendee') attendeeID: string) {
        const attendee = await this.attendeeRepository.findOneByOrFail({ id: attendeeID })
        await this.attendeeRepository.remove(attendee)
        return await this.trainingService.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.trainingService.remove(+id);
    }
}
