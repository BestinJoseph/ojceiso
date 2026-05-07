import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Role } from "../enums/role.enum";
import { Profile } from "src/profile/entities/profile.entity";
import { Request } from "src/request/entities/request.entity";
import { Department } from "src/department/entities/department.entity";
import { Branch } from "../enums/branch.enum";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true})
    username: string

    @Column({})
    password: string

    @Column({ type: "enum", enum: Role, default: Role.EMPLOYEE })
    roles: Role

    @Column({ type: "enum", enum: Branch, default: Branch.RIYADH })
    branch: string

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
    @JoinColumn()
    profile: Profile

    @Column({ nullable: true })
    refreshToken?: string

    @Column({ default: true })
    active: boolean

    @OneToMany(() => Request, (requests) =>requests.requestor)
    @JoinColumn()
    requests: Request[]

    @OneToMany(() => Request, (request) => request.approver)
    @JoinColumn()
    approvedBy: Request[]

    @OneToMany(() => Request, (request) => request.reviewer)
    @JoinColumn()
    reviewedBy: Request[]

    @OneToMany(() => Request, (request) => request.acceptor)
    @JoinColumn()
    acceptedBy: Request[]

    constructor(users: Partial<Users>) {
        Object.assign(this, users)
    }
}
