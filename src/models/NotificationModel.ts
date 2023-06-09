import { UserModel } from "./UserModel";

export type NotificationModel = {
    id: number;
    uuid: string;
    user_id: number;
    content_de: string;
    content_en: string;
    read: boolean;

    author_id?: number;
    link?: string;
    createdAt?: Date;
    updatedAt?: Date;

    user?: UserModel;
    author?: UserModel;
};
