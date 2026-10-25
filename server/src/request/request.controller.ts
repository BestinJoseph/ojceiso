import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/users/decorators/roles.decorators';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersService } from 'src/users/users.service';
import { DepartmentService } from 'src/department/department.service';

@Controller('requests')
export class RequestController {
	constructor(private readonly requestService: RequestService, private readonly usersService: UsersService, private readonly departmentsService: DepartmentService) {}

	@Roles(Role.SUPER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Req() req:any, @Body() createRequestDto: CreateRequestDto) {
		// console.log(createRequestDto)
		const requestDep = (await this.usersService.findByUsernameDep(req.user.username)).profile.department?.profile
		const reQdep = (await this.departmentsService.findOneById(createRequestDto.requestedTo?.id))
		// const reqTo = Object.values(requestDep).find( de => de.position.includes("MANAGER"))
		createRequestDto = { ...createRequestDto, requestedTo: reQdep, requestor: req.user, } 
		return await this.requestService.create(createRequestDto);
	} 

	// @Roles(Role.SUPER)
	// @UseGuards(RolesGuard)
	// @UseGuards(JwtAuthGuard)
	@Get()
	findAll(@Req() req:any ) {
		return this.requestService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id') id: any) {
		// console.log(id)
		return await this.requestService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
		return this.requestService.update(+id, updateRequestDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.requestService.remove(+id);
	}
}
