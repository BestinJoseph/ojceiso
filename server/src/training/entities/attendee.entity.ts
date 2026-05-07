import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Training } from "./training.entity";
import { Standard } from "src/standard/entities/standard.entity";

@Entity()
export class Attendee {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: true })
    attendence: string

    @Column({ type: 'text', default: 'ASSIGNED' })
    status: string

    //need to change to document
    @Column({ type: 'text', nullable: true })
    certificate: string

    @ManyToOne(() => Profile, (profile) => profile.attendee)
    @JoinColumn()
    profile: Profile

    @ManyToOne(() => Training, (training) => training.attendees)
    @JoinColumn()
    training: Training

    @ManyToMany(() => Standard, (standard) => standard.attendees)
    @JoinTable()
    standards: Standard[]

    @Column({ type: 'text', default: '' })
    remark: string

    constructor(attendee: Partial<Attendee>) {
        Object.assign(this, attendee)
    }
}
