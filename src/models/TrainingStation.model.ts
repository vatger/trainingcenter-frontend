import {TrainingRequestModel} from "./TrainingRequest.model";

export type TrainingStationModel = {
    id: number;
    callsign: string;
    frequency: number;
    deactivated: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    training_requests?: TrainingRequestModel[];
};
