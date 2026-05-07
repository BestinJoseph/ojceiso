import { PartialType } from '@nestjs/mapped-types';
import { CreatePrequalificationDto } from './create-prequalification.dto';

export class UpdatePrequalificationDto extends PartialType(CreatePrequalificationDto) {}
