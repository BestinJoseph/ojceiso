import { Ncr } from "src/ncr/entities/ncr.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Training } from "src/training/entities/training.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "src/users/entities/users.entity";
import { Sections } from "../enum/sections.enum";
import { Request } from "src/request/entities/request.entity";
import { Region } from "../enum/region.enum";
import { Branch } from "src/branch/entities/branch.entity";

@Entity()
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false, unique: true }) 
    slug: string

    @Column({ type: 'text', nullable: false, unique: true })
    name: string

    @Column({ type: 'text', nullable: false, unique: true })
    symbol: string

    @Column({ type: 'enum', enum: Sections, default: Sections.EMPTY })
    sections: Sections[]

    @Column({ type: 'enum', enum: Region, array: true, default: [Region.RIYADH]}) //should be branch
    regions: Region[]

    @OneToMany(() => Request, (request) => request.requestedTo)
    @JoinColumn()
    request: Request[]

    @OneToMany(()=>Ncr, (ncr) => ncr.department) 
    @JoinColumn()
    ncrs: Ncr[]

    @OneToMany(()=>Branch, (branch) => branch.departments) 
    @JoinColumn()
    branches: Branch[]

    @OneToMany(() => Profile, (profile) => profile.department )
    @JoinColumn()
    profile: Profile[]

    @OneToMany(() => Training, (training) => training.department )
    @JoinColumn()
    trainings: Training[]

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    createdOn: Date

    @ManyToOne(() => Users)
    @JoinColumn()
    createdBy: Users

    constructor(department: Partial<Department>) {
        Object.assign(this, department)
    }
}
