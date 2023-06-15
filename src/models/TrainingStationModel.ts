import { TrainingRequestModel } from "./TrainingRequestModel";

export type TrainingStationModel = {
    id: number;
    callsign: string;
    frequency: number;
    deactivated: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    training_requests?: TrainingRequestModel[];
};
