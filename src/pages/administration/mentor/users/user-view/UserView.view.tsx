import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import React from "react";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { UserGeneralInformationPartial } from "./_partials/UserGeneralInformation.partial";
import { UserCoursesPartial } from "./_partials/UserCourses.partial";
import { UserViewSkeleton } from "./_skeletons/UserView.skeleton";
import UserService from "../../../../../services/user/UserAdminService";
import { NetworkError } from "../../../../../components/errors/NetworkError";
import { UserMentorGroupsPartial } from "./_partials/UserMentorGroups.partial";

export function UserViewView() {
    const { user_id } = useParams();
    const { user, loading, loadingError } = UserService.getUserData(Number(user_id) ?? -1);

    return (
        <>
            <PageHeader title={"Benutzer Verwalten"} />

            <RenderIf
                truthValue={loadingError != null}
                elementTrue={<NetworkError closeable={false} error={loadingError?.error} />}
                elementFalse={
                    <RenderIf
                        truthValue={loading}
                        elementTrue={<UserViewSkeleton />}
                        elementFalse={
                            <>
                                <UserGeneralInformationPartial user={user} />
                                <UserCoursesPartial courses={user?.courses} />
                                <UserMentorGroupsPartial mentorGroups={user?.mentor_groups ?? []} />
                            </>
                        }
                    />
                }
            />
        </>
    );
}
