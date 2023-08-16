import { TrainingLogModel, TrainingSessionBelongsToUserModel } from "./TrainingSessionBelongsToUser.model";
import { TrainingTypeModel } from "./TrainingTypeModel";
import { CourseModel } from "./CourseModel";
import { TrainingStationModel } from "./TrainingStationModel";
import { UserModel } from "./UserModel";

export interface TrainingSessionModel {
    id: number;
    uuid: string;
    mentor_id?: number;
    cpt_examiner_id?: number;
    cpt_atsim_passed?: boolean;
    date: Date;
    training_type_id: number;
    course_id: number;
    createdAt?: Date;
    updatedAt?: Date;

    users?: UserModel[];
    mentor?: UserModel;
    cpt_examiner?: UserModel;
    training_logs?: TrainingLogModel[];
    training_type?: TrainingTypeModel;
    training_station?: TrainingStationModel;
    course?: CourseModel;

    user_passed?: boolean;

    through?: any;
    training_session_belongs_to_users?: TrainingSessionBelongsToUserModel[];
}

export interface UserTrainingSessionModel extends Omit<TrainingSessionModel, "training_session_belongs_to_users"> {
    training_session_belongs_to_users?: TrainingSessionBelongsToUserModel;
}
