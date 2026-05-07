import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ImmediateAction } from "./immediate.entity";
import { CorrectiveAction } from "./corrective.entity";
import { NcrVerification } from "./ncr.verification.entity";
import { Department } from "src/department/entities/department.entity";

@Entity()
export class Ncr {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    ncr_ref: string

    @Column({ default: 'internal audit' })
    ncr_type: string

    @Column({ default: '' })
    foundOn: string

    @Column({ default: '' })
    req_ref: string

    @Column({ })
    details: string

    @ManyToOne(() => Department, (department) => department.ncrs )
    @JoinTable()
    department: Department

    @Column({ default: 'major' })
    significance: string

    @Column({ default: 'Dr Fuaad' })
    raisedBy: string

    @Column({ default: '' })
    raisedOn: string

    @Column({ default: '' })
    signature: string

    @OneToOne(() => ImmediateAction, (immediate) => immediate.ncr, { cascade: true })
    @JoinColumn()
    immediateAction: ImmediateAction

    @OneToOne(() => CorrectiveAction, (corrective) => corrective.ncr, { cascade: true })
    @JoinColumn()
    correctiveAction: CorrectiveAction

    @OneToOne(() => NcrVerification, (verification) => verification.ncr, { cascade: true })
    @JoinColumn()
    verification: NcrVerification

    @OneToMany(() => Image, (image) => image.ncr, { cascade: true })
    @JoinColumn()
    evidence: Image[]

    constructor(ncr: Partial<Ncr>) {
        Object.assign(this, ncr)
    }
}
