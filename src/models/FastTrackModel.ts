export type FastTrackModel = {
    id: number;
    user_id: number;
    requested_by_user: number;
    status: number;
    rating: number;

    file_name?: string;
    comment?: string;
    response?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
