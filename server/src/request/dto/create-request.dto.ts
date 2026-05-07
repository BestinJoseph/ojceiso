import { Users } from "src/users/entities/users.entity";
import { Category } from "../enum/category.enum";
import { Status } from "../enum/status.enum";
import { Department } from "src/department/entities/department.entity";

export class CreateRequestDto {
    catergory: Category
    requestType: string
    requestedTo: Department 
    data: JSON
    status: Status
    requestor: Users
    reviewer: Users
    approver: Users
    acceptor?: Users
} 
