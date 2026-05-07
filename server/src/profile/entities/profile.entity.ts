import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "src/department/entities/department.entity";
import { Users } from "src/users/entities/users.entity";
import { Responsibility } from "../enum/profile.enum";
import { ePosition } from "../enum/position.enum";
import { Image } from "src/image/entities/image.entity";
import { Marital } from "../enum/marital.enum";
import { Personal } from "./personal.entity";
import { Employements } from "./employement.entity";
import { Education } from "./education.entity";
import { Attendee } from "src/training/entities/attendee.entity";
import { Position } from "./position.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'text', default: ''})
    name: string

    @Column({type: 'enum', enum: ePosition, default: ePosition.TECHNICIAN })
    position: ePosition

    @OneToOne(() => Personal, (personal) => personal.profile)
    @JoinColumn()
    personal: Personal

    @Column({ type: 'enum', enum: Responsibility, array: true, default: [Responsibility.CREATOR] })
    responsibilities: Responsibility[]

    @Column({ type: 'text', array: true, nullable: true })
    qualifications: string[]

    @Column({ type: 'text', array: true, nullable: true })
    certificates: string[]

    @OneToOne(() => Users, (user) => user.profile )
    @JoinTable()
    user: Users

    @Column({ type: 'text', nullable: true })
    image: string

    @ManyToOne(() => Department, (department) => department.profile )
    @JoinColumn()
    department: Department

    @OneToMany(() => Position, (positions) => positions.profile)
    @JoinColumn()
    positions: Position[]

    @OneToMany(() => Education, (education) => education.profile)
    @JoinColumn()
    educations: Education[]

    @OneToMany(()=>Attendee, (attendee) => attendee.profile)
    @JoinColumn()
    attendee: Attendee

    constructor(profile: Partial<Profile>) {
        Object.assign(this, profile)
    }
}
