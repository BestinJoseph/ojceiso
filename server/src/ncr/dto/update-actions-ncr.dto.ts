export class UpdateIActionNcrDto {
    iaction: string
    correctedBy: string
    correctedOn: string
}

export class UpdateVerificationNcrDto {
    effectiveness: string
    verifiedBy: string
    verifiedOn: string
    acceptence: boolean
    communication: string
    informedBy: string
    informedOn: string
}

export class UpdateCActionNcrDto {
    rootcause: string
    caction: string
    approvedBy: string
    implementedby: string
    implementedOn: string
}