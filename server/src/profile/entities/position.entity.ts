import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employements } from "./employement.entity";
import { Profile } from "./profile.entity";

@Entity()
export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({ type: 'text', nullable: false, default: "officer" })
    name: string

    @Column({ type: 'text', nullable: false })
    company: string

    @Column({ type: Date, nullable: false }) 
    start: Date

    @Column({ type: Date,  nullable: true})
    end: string

    @Column({ type: 'text', default: '' })
    certificate: string

    @Column({ type: 'text', default: 'Riyadh'})
    region: string

    @Column({ type: 'text', default: 'Saudi Arabia' })
    country: string

    @ManyToOne(() => Profile, (profile) => profile.positions)
    @JoinColumn()
    profile: Profile

    constructor(positions: Partial<Position>) {
        Object.assign(this, positions)
    }
}
