import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ncr } from "./ncr.entity";

@Entity()
export class ImmediateAction {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    iaction: string

    @Column({})
    correctedBy: string

    @Column({})
    correctedOn: string

    @OneToOne(() => Ncr, (ncr) => ncr.immediateAction )
    ncr: Ncr

    @OneToMany(() => Image, (image) => image.iaction)
    @JoinColumn()
    images: Image[]

    constructor(immediate: Partial<ImmediateAction>) {
        Object.assign(this, immediate)
    }
}