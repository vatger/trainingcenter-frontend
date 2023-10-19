import { TrainingStationModel } from "@/models/TrainingStationModel";

export interface EndorsementGroupModel {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt?: Date;

    stations?: TrainingStationModel[];

    EndorsementGroupsBelongsToUsers?: EndorsementGroupsBelongsToUsers;
}

export interface EndorsementGroupsBelongsToUsers {
    id: number;
    endorsement_group_id: number;
    user_id: number;
    solo: boolean;
    solo_rating?: "s1" | "s2" | "s3" | "c1" | "c3";
    solo_expires?: Date;
    solo_extension_count?: number;
    createdAt: Date;
    updatedAt?: Date;
}
