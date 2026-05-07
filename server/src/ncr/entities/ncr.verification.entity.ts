import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ncr } from "./ncr.entity";

@Entity()
export class NcrVerification {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    effectiveness: string

    @Column({})
    verifiedBy: string

    @Column({})
    verifiedOn: string

    @Column({})
    acceptence: boolean

    @Column({ nullable: false })
    communication: string

    @Column({})
    informedBy: string

    @Column({})
    informedOn: string
    
    @OneToOne(() => Ncr, (ncr) => ncr.verification)
    ncr: Ncr

    @OneToOne(() => Image, (image) => image.verification )
    @JoinColumn()
    documents: Image[]

    constructor(corrective: Partial<NcrVerification>) {
        Object.assign(this, corrective)
    }
}