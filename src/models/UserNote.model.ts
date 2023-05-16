import {UserModel} from "./User.model";

export type UserNoteModel = {
    id: number;
    uuid: string;
    user_id: number;
    author_id: number;
    course_id?: number;
    content: string;
    createdAt: Date;
    updatedAt?: Date;

    user?: UserModel;
    author?: UserModel;
};
