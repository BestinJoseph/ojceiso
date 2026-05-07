import { Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateNcrDto } from './dto/create-ncr.dto';
import { UpdateNcrDto } from './dto/update-ncr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ncr } from './entities/ncr.entity';
import { Repository } from 'typeorm';
import { ImmediateAction } from './entities/immediate.entity';
import { UpdateIActionNcrDto, UpdateCActionNcrDto, UpdateVerificationNcrDto } from './dto/update-actions-ncr.dto';
import { CorrectiveAction } from './entities/corrective.entity';
import { NcrVerification } from './entities/ncr.verification.entity';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/users/decorators/roles.decorators'; 

@Injectable()
export class NcrService {
    constructor( 
        @InjectRepository(Ncr) 
        private ncrRepository: Repository<Ncr>,
        @InjectRepository(ImmediateAction)
        private iactionRepository: Repository<ImmediateAction>,
        @InjectRepository(CorrectiveAction)
        private cactionRepository: Repository<CorrectiveAction>,
        @InjectRepository(NcrVerification)
        private verificationRepository: Repository<NcrVerification>
    ) {}

    async create(user: any, createNcrDto: CreateNcrDto) {
        const lastNcr = await this.ncrRepository.findOne({ where: [{ ncr_type: 'internal' }], order: {ncr_ref: 'DESC'}})
        const typeOfNCR = 'IA'
        const refNo = lastNcr === null ? '001' : (('00' + (parseInt(lastNcr.ncr_ref.split('-')[5]) + 1)).slice(-3)).toString()
        createNcrDto.ncr_ref = `OJCE-${createNcrDto.department?.symbol}-${typeOfNCR}-NCR-24-${refNo}`
        createNcrDto.raisedBy = user.username
        return this.ncrRepository.save(createNcrDto); 
    }

    async findAll() {
        return await this.ncrRepository.find({ order: { ncr_ref: 'DESC', }, relations: { department: true, immediateAction: true, correctiveAction: true, verification: true, evidence: true }});
    }

    findOne(id: any, req: any) {
        return this.ncrRepository.findOne({ where: { id }, relations: { immediateAction: true, correctiveAction: true, verification: true } });
    }

    async updateActions(action: string, updateNcrDto: any, user: any, ncrId: string) {
        let updatedNcr: any
        try {
            const ncr = await this.ncrRepository.findOne({ where: {id: ncrId}, relations: { immediateAction: true, correctiveAction: true, verification: true } })
            if(ncr) {
                switch (action) {
                    case 'immediateAction':
                        if(ncr && ncr.immediateAction === null) {
                            const valI: UpdateIActionNcrDto = updateNcrDto
                            updatedNcr = await this.iactionRepository.save(valI)
                            break;
                        } else {
                            return { success: false, msg: 'immediated action issue', error: true}
                        }
                    case 'correctiveAction':
                        if(ncr && ncr.immediateAction !== null && ncr.correctiveAction === null) {
                            const valC: UpdateCActionNcrDto = updateNcrDto
                            updatedNcr = await this.cactionRepository.save(valC)
                            break;
                        } else {
                            return { success: false, msg: 'corrective action issue', error: true}
                        }
                    case 'verification':
                        if(ncr && ncr.immediateAction !== null && ncr.correctiveAction !== null && ncr.verification === null) {
                            const verifyVal: UpdateVerificationNcrDto = updateNcrDto
                            updatedNcr = await this.verificationRepository.save(verifyVal)
                            break;
                        } else {
                            return { success: false, msg: 'verification issue', error: true}
                        }
                    default:
                        return { success: false, msg: `${action} action issue`, error: true } 
                }

                if(updatedNcr) {
                    const updated = await this.ncrRepository.update({ id: ncr.id }, { [action]: updatedNcr })
                    if(updated) return updated
                    return { success: false, }
                }
                return { success: false, msg: `failed to update ncr issue`, error: true }
            }
            return `This action updates a #${ncrId} ncr`;
        } catch (err) {
            return err
        }
    }

    remove(id: number) {
        return `This action removes a #${id} ncr`;
    }
}
