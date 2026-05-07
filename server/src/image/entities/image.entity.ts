import { Certificate } from "src/certificate/entities/certificate.entity"
import { CorrectiveAction } from "src/ncr/entities/corrective.entity"
import { ImmediateAction } from "src/ncr/entities/immediate.entity"
import { Ncr } from "src/ncr/entities/ncr.entity"
import { NcrVerification } from "src/ncr/entities/ncr.verification.entity"
import { Profile } from "src/profile/entities/profile.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    pathname: string

    @ManyToOne(() => Ncr, (ncr) => ncr.evidence)
    @JoinColumn()
    ncr: Ncr

    @ManyToOne(() => ImmediateAction, (iaction) => iaction.images)
    @JoinColumn()
    iaction: ImmediateAction

    @ManyToOne(() => CorrectiveAction, (caction) => caction.images)
    @JoinColumn()
    caction: ImmediateAction

    @ManyToOne(() => NcrVerification, (verification) => verification.documents)
    @JoinColumn()
    verification: NcrVerification

    @OneToMany(() => Certificate, (certificate) => certificate.doc)
    @JoinColumn()
    cerificate: Certificate

    @ManyToOne(() => Certificate, (certificate) => certificate.expired, { onDelete: 'CASCADE'} )
    @JoinColumn()
    expiredcerificate: Certificate

    constructor(image: Partial<Image>) {
        Object.assign(this, image)
    }
}
