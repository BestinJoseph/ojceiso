import { SetMetadata } from "@nestjs/common"
import { Department } from "src/users/enums/department.enum"


export const DEPARTMENTS_KEY = 'departments'
export const Departments = (...departments: [Department, ...Department[]]) => SetMetadata(DEPARTMENTS_KEY, departments)