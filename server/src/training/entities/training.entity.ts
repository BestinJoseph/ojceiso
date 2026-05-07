import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "../enum/section.enum";
import { TrainingType } from "../enum/trainingtype.enum";
import { Department } from "src/department/entities/department.entity";
import { Attendee } from "./attendee.entity";
import { Standard } from "src/standard/entities/standard.entity";

@Entity()
export class Training {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', default: 'OJCE-TRA-001'}) //nullable: false, unique: true
    reference: string

    @Column({ type: 'text', nullable: false, default: ''})
    name: string

    @Column({ type: 'enum', enum: Section, default: Section.SOIL})
    section: Section

    @Column({ type: 'text', default: null }) 
    level: string

    @Column({ type: 'text', default: null})
    standard: string

    @Column({ type: 'text', default: null})
    plannedOn: string

    @Column({ type: 'text', default: null})
    conductedOn: string

    @ManyToOne(() => Department, (department) => department.trainings )
    @JoinColumn()
    department: Department

    @Column({ type: 'enum', enum: TrainingType, default: TrainingType.INTERNAL })
    trainingtype: TrainingType

    @OneToMany(() => Attendee, (attendee) => attendee.training )
    @JoinColumn()
    attendees: Attendee[]

    @OneToMany(() => Standard, (standard) => standard.trainings)
    @JoinTable()
    standards: Standard

    @Column({type: 'text', nullable: true, default: null})
    trainer: string

    @Column({ type: 'text', default: 'scheduled'})
    status: string

    constructor(training: Partial<Training>) {
        Object.assign(this, training)
    }
}
