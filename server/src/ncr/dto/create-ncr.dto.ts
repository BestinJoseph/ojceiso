import { Department } from "src/department/entities/department.entity"
import { Image } from "src/image/entities/image.entity"

export class CreateNcrDto {
    ncr_ref: string
    details: string
    foundOn: string
    req_ref: string
    ncr_type: string
    raisedOn: string
    raisedBy: string
    department: Department
    significance: string
    evidence: Image[]
}
