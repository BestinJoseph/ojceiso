import { Department } from "src/department/entities/department.entity"
import { Section } from "../enum/section.enum"
import { TrainingType } from "../enum/trainingtype.enum"

export class CreateTrainingDto {
    name: string
    section: Section
    level: string
    standrad?: string
    plannedOn: string
    completedOn?: string
    department: Department
    trainingtype: TrainingType
}
