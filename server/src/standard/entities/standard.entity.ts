import { Test } from "src/test/entities/test.entity";
import { Attendee } from "src/training/entities/attendee.entity";
import { Training } from "src/training/entities/training.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Standard {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false, unique: true })
    name: string

    @Column({ type: 'text', nullable: false, unique: true })
    number: string 

    @Column({ type: 'text', nullable: false, })
    organization: string

    @Column({ type: 'text', nullable: false, })
    published: string

    @Column({ type: 'text', })
    description: string

    @ManyToMany(() => Attendee, (attendee) => attendee.standards)
    attendees: Attendee[]

    @ManyToMany(() => Training, (training) => training.standards)
    trainings: Training[]

    @ManyToMany(() => Test, (test) => test.standards)
    tests: Test[]

    @Column({ type: 'text', array: true, default: []})
    obsolute: string[]

    constructor(standard: Partial<Standard>) {
        Object.assign(this, standard)
    }
}
