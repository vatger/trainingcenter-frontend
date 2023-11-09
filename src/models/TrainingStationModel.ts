import { TrainingRequestModel } from "./TrainingRequestModel";

export type TrainingStationModel = {
    id: number;
    callsign: string;
    frequency: number;
    createdAt?: Date;
    updatedAt?: Date;

    training_requests?: TrainingRequestModel[];
};
