import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrequalificationService } from './prequalification.service';
import { CreatePrequalificationDto } from './dto/create-prequalification.dto';
import { UpdatePrequalificationDto } from './dto/update-prequalification.dto';

@Controller('prequalification')
export class PrequalificationController {
  constructor(private readonly prequalificationService: PrequalificationService) {}

  @Post()
  create(@Body() createPrequalificationDto: CreatePrequalificationDto) {
    return this.prequalificationService.create(createPrequalificationDto);
  }

  @Get()
  findAll() {
    return this.prequalificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prequalificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrequalificationDto: UpdatePrequalificationDto) {
    return this.prequalificationService.update(+id, updatePrequalificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prequalificationService.remove(+id);
  }
}
