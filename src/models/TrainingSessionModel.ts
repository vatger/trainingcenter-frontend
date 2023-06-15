import { TrainingLogModel, TrainingSessionBelongsToUserModel } from "./TrainingSessionBelongsToUser.model";
import { TrainingTypeModel } from "./TrainingTypeModel";
import { CourseModel } from "./CourseModel";
import { TrainingStationModel } from "./TrainingStationModel";
import { UserModel } from "./UserModel";

export type TrainingSessionModel = {
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

    through?: any;

    users?: UserModel[];
    mentor?: UserModel;
    cpt_examiner?: UserModel;
    training_logs?: TrainingLogModel[];
    training_type?: TrainingTypeModel;
    training_station?: TrainingStationModel;
    course?: CourseModel;

    TrainingSessionBelongsToUsers?: TrainingSessionBelongsToUserModel;
};
