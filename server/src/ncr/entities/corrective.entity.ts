import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ncr } from "./ncr.entity";

@Entity()
export class CorrectiveAction {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    routecause: string

    @Column({ nullable: false })
    caction: string

    @Column({})
    approvedBy: string

    @Column({})
    implementedBy: string

    @Column({})
    implementedOn: string

    @OneToOne(() => Ncr, (ncr) => ncr.correctiveAction)
    ncr: Ncr

    @OneToMany(() => Image, (image) => image.caction)
    @JoinColumn()
    images: Image[]

    constructor(corrective: Partial<CorrectiveAction>) {
        Object.assign(this, corrective)
    }
}