import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class Education {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false, default: '' })
    course: string

    @Column({ type: 'text', nullable: false, default: '' })
    discipline: string

    @Column({ type: 'text', nullable: false, default: '' })
    institute: string

    @Column({ type: 'text', nullable: false })
    start: string

    @Column({ type: 'text', nullable: true })
    completed: string

    @Column({ type: 'text', nullable: true })
    mark: string

    @Column({ type: 'text', nullable: false, default: '' })
    location: string

    @ManyToOne(() => Profile, (profile) => profile.educations )
    @JoinColumn()
    profile: Profile

    constructor(education: Partial<Education>) {
        Object.assign(this, education)
    }
}
