import { Branch } from "../enums/branch.enum";
import { Role } from "../enums/role.enum";

export class UpdateUserRolesDto  {
    roles: Role
    branch: Branch
}