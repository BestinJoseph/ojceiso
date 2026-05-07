import { Profile } from "src/profile/entities/profile.entity"
import { Department } from "../enums/department.enum"
import { Role } from "../enums/role.enum"

export class CreateUserDto {
    username: string
    password: string
    roles: Role
    active: boolean
    name: string
}