import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import React from "react";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { UVUserGeneralInformationPartial } from "./_partials/UVUserGeneralInformation.partial";
import { UVUserCoursesPartial } from "./_partials/UVUserCourses.partial";
import { UVUserViewSkeleton } from "./_skeletons/UVUserView.skeleton";
import UserService from "../../../../../services/user/UserAdminService";
import { NetworkError } from "@/components/errors/NetworkError";
import { UVUserMentorGroupsPartial } from "./_partials/UVUserMentorGroups.partial";

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
                        elementTrue={<UVUserViewSkeleton />}
                        elementFalse={
                            <>
                                <UVUserGeneralInformationPartial user={user} />
                                <UVUserCoursesPartial courses={user?.courses} />
                                <UVUserMentorGroupsPartial mentorGroups={user?.mentor_groups ?? []} />
                            </>
                        }
                    />
                }
            />
        </>
    );
}
