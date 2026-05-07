import { Profile } from "src/profile/entities/profile.entity";
import { Training } from "../entities/training.entity";

export class CreateAttendeeDto {
    profile: Profile
    training: Training
}