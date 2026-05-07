import { Position } from "../entities/position.entity"

export class newEmployementDto {
    name: string
    company: string
    start: string
    end?: string
    certificate?: string
    region: string
    country: string
}
