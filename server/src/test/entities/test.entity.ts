import { Standard } from "src/standard/entities/standard.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', })
    reference: string

    @ManyToMany(() => Standard, (standard) => standard.tests)
    @JoinTable()
    standards: Standard[]

    constructor(test: Partial<Test>) {
        Object.assign(this, test)
    }
}
