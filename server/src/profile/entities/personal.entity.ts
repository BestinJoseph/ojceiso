import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Marital } from "../enum/marital.enum";
import { Responsibility } from "../enum/profile.enum";
import { Profile } from "./profile.entity";

@Entity()
export class Personal {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: true, default: '' })
    mobile: string

    @Column({ type: 'text', nullable: true, default: '' })
    email: string

    @Column({ type: 'text', default: '' })
    iqama: string

    @Column({ type: 'text', default: '' })
    passport: string

    @Column({ type: 'text', default: '' })
    expire: string

    @Column({ type: 'text', default: new Date() })
    dob: string

    @Column({ type: 'text', default: ''})
    placeofbirth: string

    @Column({type: 'text', default: 'SAUDI ARABIA'})
    country: string

    @Column({type: 'enum', enum: Marital, default: Marital.single})
    marital: Marital

    @Column("text", { array: true, default: ["ENGLISH"] })
    language: string[]

    @Column({ type: 'enum', enum: Responsibility, array: true, default: [Responsibility.CREATOR] }) 
    responsibilities: Responsibility[]

    @OneToOne(() => Profile, (personal) => personal.personal)
    profile: Profile

    constructor(personal: Partial<Personal>) {
        Object.assign(this, personal)
    }
}