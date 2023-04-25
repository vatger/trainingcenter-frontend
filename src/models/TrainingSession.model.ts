import { TrainingLogModel } from "./TrainingSessionBelongsToUser.model";
import { TrainingTypeModel } from "./TrainingType.model";
import { CourseModel } from "./Course.model";
import { TrainingStationModel } from "./TrainingStation.model";
import { UserModel } from "./User.model";

export type TrainingSessionModel = {
    id: number;
    uuid: string;
    mentor_id?: number;
    cpt_examiner_id?: number;
    date: Date;
    training_type_id: number;
    course_id: number;
    createdAt?: Date;
    updatedAt?: Date;

    through?: any;

    training_logs?: TrainingLogModel[];
    training_type?: TrainingTypeModel;
    training_station?: TrainingStationModel;
    course?: CourseModel;
    mentor?: UserModel;
};
