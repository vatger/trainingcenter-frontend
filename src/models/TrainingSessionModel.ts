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

    // These are both required since, usually, a session has more than one association between the user and itself (multiple users can take part in the same session)
    // Unfortunately, the backend-design for the training history model works by querying the user. Obviously, one user can only be in a course once
    // and thus the backend returns an object instead of the array.
    // TODO: Fix this and make it more clear in the future
    training_session_belongs_to_users?: TrainingSessionBelongsToUserModel[];
    single_user_through?: TrainingSessionBelongsToUserModel;
};