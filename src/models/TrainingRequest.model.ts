import {UserModel} from "./User.model";
import {TrainingTypeModel} from "./TrainingType.model";
import {TrainingSessionModel} from "./TrainingSession.model";
import {TrainingStationModel} from "./TrainingStation.model";
import {CourseModel} from "./Course.model";

type TrainingRequestStatusType = "requested" | "planned" | "cancelled" | "completed";

export type TrainingRequestModel = {
    id: number;
    uuid: string;
    user_id: number;
    training_type_id: number;
    course_id: number;
    comment: string;
    status: TrainingRequestStatusType;
    expires: Date;
    createdAt?: Date;
    updatedAt?: Date;

    training_session_id?: number;

    user?: UserModel;
    training_type?: TrainingTypeModel;
    course?: CourseModel;
    training_session?: TrainingSessionModel;
    training_station?: TrainingStationModel;
};
