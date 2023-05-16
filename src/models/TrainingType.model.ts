import {TrainingLogTemplateModel} from "./TrainingLogTemplate.model";
import {TrainingStationModel} from "./TrainingStation.model";

export type TrainingTypes = "online" | "sim" | "cpt" | "lesson";

export type TrainingTypeModel = {
    id: number;
    name: string;
    type: TrainingTypes;
    log_template_id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    log_template?: TrainingLogTemplateModel;
    training_stations?: TrainingStationModel[];
};
