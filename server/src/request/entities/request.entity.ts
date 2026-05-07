import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { Category } from "../enum/category.enum";
import { Department } from "src/department/entities/department.entity";

@Entity()
export class Request {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'enum', enum: Category, default: Category.NEW})
    category: Category

    @Column({})
    requestType: string

    @Column({ type: 'enum', enum: Status, default: Status.REQUESTED})
    status: Status

    @Column('jsonb', {nullable: true})
    data?: object

    @ManyToOne(() => Users, (users) => users.requests)
    @JoinColumn()
    requestor: Users

    @ManyToOne( () => Department, (department) => department.request )
    requestedTo: Department

    @ManyToOne(() => Users, (user) => user.reviewedBy)
    @JoinColumn()
    reviewer: Users

    @ManyToOne(() => Users, (user) => user.approvedBy)
    @JoinColumn()
    approver: Users

    @ManyToOne(() => Users, (user) => user.acceptedBy)
    @JoinColumn()
    acceptor: Users

    @Column("text", { array: true, default: [] })
    comments: string[]

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    createdOn: Date

    @Column({ type: 'timestamptz', default: null })
    updatedOn?: Date

    constructor(request: Partial<Request>) {
        Object.assign(this, request)
    }
}
