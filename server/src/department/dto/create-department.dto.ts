import { Users } from "src/users/entities/users.entity"

export class CreateDepartmentDto {
    name: string
    slug: string
    symbol: string
    createdBy: Users
}
