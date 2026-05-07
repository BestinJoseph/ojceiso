import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { DEPARTMENTS_KEY } from 'src/department/decorators/department.decorators';
import { Department } from 'src/users/enums/department.enum';

@Injectable()
export class DepartmentsGuard implements CanActivate {
    constructor (private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean {
        const requiredDepartments = this.reflector.getAllAndOverride<Department>(DEPARTMENTS_KEY, [context.getHandler(), context.getClass()])
        console.log(requiredDepartments)
        return true;
    }
}