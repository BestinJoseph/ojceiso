import { Profile } from "src/profile/entities/profile.entity";
import { Training } from "../entities/training.entity";

export class AddAttendeeDto {
    profile?: Profile
    training?: Training
}