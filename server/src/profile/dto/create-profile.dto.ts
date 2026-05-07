import { Department } from "src/department/entities/department.entity"
import { Users } from "src/users/entities/users.entity"
import { Responsibility } from "../enum/profile.enum"
import { ePosition } from "../enum/position.enum"
import { Personal } from "../entities/personal.entity"

export class CreateProfileDto {
    name: string
    position: ePosition
    responsibilities: Responsibility[]
    user: Users
    qualifications: string[]
    experiences: string[]
    department: Department
    personal: Personal
}
