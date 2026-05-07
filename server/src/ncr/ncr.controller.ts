import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { NcrService } from './ncr.service';
import { CreateNcrDto } from './dto/create-ncr.dto';
import { UpdateNcrDto } from './dto/update-ncr.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateIActionNcrDto, UpdateCActionNcrDto, UpdateVerificationNcrDto } from './dto/update-actions-ncr.dto'
import { Roles } from 'src/users/decorators/roles.decorators';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { storage } from 'src/config/storage.config';
import { Image } from 'src/image/entities/image.entity';
import { DepartmentService } from 'src/department/department.service';
import { Department } from 'src/department/entities/department.entity';

@Controller('ncrs')
export class NcrController {
    constructor(
        private readonly ncrService: NcrService, 
        private readonly imageService: ImageService, 
        private readonly departmentServices: DepartmentService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('docs', 10, { storage }))
    @Post()
    async create(@Body() createNcrDto: CreateNcrDto, @UploadedFiles() files: Array<Express.Multer.File>, @Body() data: any,  @Req() req: any) {
        const department = await this.departmentServices.findOneByName(data.department)
        const evid: Image[] = []
        for( let file of files) {
            const ev = await this.imageService.createDocs({ pathname: file.filename })
            evid.push(ev)
        }
        createNcrDto.evidence = evid
        createNcrDto.department = department
        return await this.ncrService.create(req.user, { ...createNcrDto });
        // return data
    }

    // @Roles(Role.IT, Role.AUDITOR, Role.ADMINISTRATOR, Role.OFFICER, Role.TECNICIAN)
    // @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard) 
    @Get()
    async findAll(@Req() req: any) {
        return await this.ncrService.findAll()
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard) 
    @Get(':id')
    async findOne(@Req() req: any, @Param('id') id: string) {
        return await this.ncrService.findOne(id, req);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateNCRAction(@Body() updateData: any, @Req() req: any) {
        const { action, data: updateNcrDto, ncrId } = updateData
        return await this.ncrService.updateActions(action, updateNcrDto, req.user, ncrId);
    }

    @Roles(Role.AUDITOR, Role.INCHARGE)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ncrService.remove(+id);
    }
}


// function ApiConsumes(arg0: string): (target: NcrController, propertyKey: "create", descriptor: TypedPropertyDescriptor<(createNcrDto: CreateNcrDto, file: any, req: any) => Promise<CreateNcrDto & import("./entities/ncr.entity").Ncr>>) => void | TypedPropertyDescriptor<...> {
//     throw new Error('Function not implemented.');
// }

function imageFileFilter(req: any, file: { fieldname: string; originalname: string; encoding: string; mimetype: string; size: number; destination: string; filename: string; path: string; buffer: Buffer; }, callback: (error: Error, acceptFile: boolean) => void): void {
    throw new Error('Function not implemented.');
}

