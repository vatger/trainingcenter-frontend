import { MentorGroupModel } from "./MentorGroup.model";
import { CourseModel } from "./Course.model";
import { PermissionModel, RoleModel } from "./Permission.model";

export type UserModel = {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    user_data?: UserDataModel;
    user_settings?: UserSettingsModel;
    mentor_groups?: MentorGroupModel[];
    courses?: CourseModel[];
    roles?: RoleModel[];
    through?: any;
    UsersBelongsToCourses?: UserCourseThrough; // Append as required x | x
    createdAt: Date;
    updatedAt?: Date;
};

export type UserSettingsModel = {
    user_id: number;
    language: "de" | "en";
    dark_mode: boolean;
    email_notification_enabled: boolean;
    additional_emails?: string[];
    createdAt: Date;
    updatedAt?: Date;
};

export type UserDataModel = {
    rating_atc: number;
    rating_pilot: number;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    division_code: string;
    division_name: string;
    subdivision_code: string | undefined;
    subdivision_name: string | undefined;
    createdAt: Date;
    updatedAt?: Date;
};

export type UserCourseThrough = {
    id: number;
    user_id: number;
    course_id: number;
    next_training_type?: number;
    skill_set?: JSON;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
};
