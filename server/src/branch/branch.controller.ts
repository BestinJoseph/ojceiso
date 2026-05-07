import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorators';
import { Role } from 'src/users/enums/role.enum';

@Controller('branches')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Roles(Role.SUPER, Role.MANAGER)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBranchDto: CreateBranchDto) {
        return this.branchService.create(createBranchDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.branchService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.branchService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
        return this.branchService.update(+id, updateBranchDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.branchService.remove(+id);
    }
}
