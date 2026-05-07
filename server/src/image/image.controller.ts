import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post()
    createDocs(@Body() createImageDto: CreateImageDto) {
        return this.imageService.createDocs(createImageDto);
    }

    @Get()
    async findAll() {
        return await this.imageService.findAll(); 
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.imageService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
        return await this.imageService.update(id, updateImageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imageService.remove(+id);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('evidences/:pathname')
    findImageById(@Param('pathname') pathname: string, @Res() res: any): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/' + pathname )));
    }

    // @UseGuards(JwtAuthGuard)
    @Get('dp/:pathname')
    findDPById(@Param('pathname') pathname: string, @Res() res: any): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/' + pathname )));
    }
}
