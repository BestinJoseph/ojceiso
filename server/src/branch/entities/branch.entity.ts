import { Department } from "src/department/entities/department.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'text', nullable: false, unique: true})
    name: string

    @Column({type: 'text', nullable: false, unique: true})
    abbreviation: string

    @ManyToOne(() => Department, (department) => department.branches)
    @JoinColumn()
    departments: Department[]

    constructor(branch: Partial<Branch>) {
        Object.assign(this, branch) 
    }
}
