import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Certificate {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false, unique: true })
    ref: string

    @Column({ type: 'text', nullable: false, default: 'GOSI', unique: true })
    name: string

    @Column({type: 'text', nullable: false })
    activatedon: string

    @Column({type: 'text', nullable: false })
    expirydate: string

    @ManyToOne(() => Image, (image) => image.cerificate, { eager: true, orphanedRowAction: 'delete' })
    @JoinColumn()
    doc: Image

    @OneToMany(() => Image, (image) => image.expiredcerificate, { cascade: true })
    @JoinColumn()
    expired: Image[]

    constructor(certificate: Partial<Certificate>) {
        Object.assign(this, certificate) 
    }
}
