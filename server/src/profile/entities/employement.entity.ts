import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Position } from "./position.entity";

@Entity()
export class Employements {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // @ManyToOne(() => Position, (positions) => positions.employers)
    // @JoinColumn()
    // position: Position[]

    // @ManyToOne(() => Profile, (profile) => profile.positions)
    // @JoinColumn()
    // profile: Profile

    constructor(employements: Partial<Employements>) {
        Object.assign(this, employements)
    }
}
