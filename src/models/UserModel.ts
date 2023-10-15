import { MentorGroupModel } from "./MentorGroupModel";
import { CourseModel } from "./CourseModel";
import { RoleModel } from "./PermissionModel";
import {EndorsementGroupModel} from "@/models/EndorsementGroupModel";

export type UserModel = {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    user_data?: UserDataModel;
    user_settings?: UserSettingsModel;
    mentor_groups?: MentorGroupModel[];
    endorsement_groups?: EndorsementGroupModel[];
    courses?: CourseModel[];
    roles?: RoleModel[];
    through?: any;
    UsersBelongsToCourses?: UserCourseThrough; // Append as required x | x
    UserBelongToMentorGroups?: UserMentorGroupThrough;
    createdAt: Date;
    updatedAt?: Date;
};

export type UserSettingsModel = {
    user_id: number;
    language: "de" | "en";
    dark_mode: "auto" | "dark" | "light";
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

export type UserMentorGroupThrough = {
    group_admin: boolean;
    can_manage_course: boolean;
    createdAt: Date;
    updatedAt?: Date;
};
