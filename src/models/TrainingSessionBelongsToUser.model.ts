import { TrainingTypeModel } from "./TrainingTypeModel";
import { TrainingSessionModel } from "./TrainingSessionModel";

export type TrainingSessionBelongsToUserModel = {
    id: number;
    user_id: number;
    training_session_id: number;
    log_id?: number;
    passed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    training_session?: TrainingSessionModel;
    training_log?: TrainingLogModel;
};

export type TrainingLogModel = {
    id: number;
    uuid: string;
    content: object;
    log_public: boolean;
    author_id: number;
    createdAt?: Date;
    updatedAt?: Date;

    TrainingSessionBelongsToUsers?: TrainingSessionBelongsToUserModel;
};

export type CourseTrainingSessionModel = {
    session: {
        id: number;
        uuid: string;
        mentor_id?: number;
        cpt_examiner_id?: number;
        date?: Date;
        training_type_id: number;
        course_id: number;
        createdAt?: Date;
        updatedAt?: Date;

        through: {
            log_id: number;
            passed: boolean;
        };

        course: {
            uuid: string;
            id: number;
        };

        training_type: TrainingTypeModel;
    };

    training_log: TrainingLogModel;
};
