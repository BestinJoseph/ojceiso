import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Req, NotAcceptableException } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/users/decorators/roles.decorators';
import { Role } from 'src/users/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { UsersService } from 'src/users/users.service';

@Controller('departments')
export class DepartmentController {
    constructor(
        private readonly departmentService: DepartmentService, 
        private readonly usersServices: UsersService,
        @InjectRepository(Department) private readonly departmentRepository: Repository<Department>
    ) {}

    // @Roles(Role.SUPER)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: any, @Body() createDepartmentDto: CreateDepartmentDto) { 
        // console.log(createDepartmentDto)
        try {
            const existDepartment = await this.departmentRepository.findOneBy({ name: createDepartmentDto.name })
            if(existDepartment) {
                throw new NotAcceptableException("Department already exisit")
            }
            const slug = createDepartmentDto.name.split(' ').reduce( (obj, acc, key) => { obj += "_" + acc; return obj}, " " )
            return await this.departmentService.create({ ...createDepartmentDto, slug: slug.trim(), createdBy: req.user }); 
        } catch (err) {
            return { success: false, message: err.message }
        }
    }

    @Get()
    async findAll() {
        return await this.departmentService.findAll(); 
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOneBy(@Param('id') id: string) {
        const dep = await this.departmentService.findOneById(id)
        if(!dep) throw new NotFoundException()
        return dep;
    }

    // @Get(':id')
    // async findOne(@Param('id') name: string) {
    //     const dep = await this.departmentService.findOneByName(name)
    //     if(!dep) throw new NotFoundException() 
    //     return dep;
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.update(+id, updateDepartmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.departmentService.remove(+id);
    }
}
