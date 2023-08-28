import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { FormEvent, useRef, useState } from "react";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { COLOR_OPTS, TYPE_OPTS } from "@/assets/theme.config";
import { generateUUID } from "@/utils/helper/UUIDHelper";
import CourseAdministrationService from "../../../../../services/course/CourseAdminService";
import { Separator } from "@/components/ui/Separator/Separator";
import { Input } from "@/components/ui/Input/Input";
import { TbFilePlus, TbId } from "react-icons/all";
import { Button } from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../../services/user/UserService";
import { Card } from "@/components/ui/Card/Card";
import FormHelper from "../../../../../utils/helper/FormHelper";
import { NetworkError } from "@/components/errors/NetworkError";
import { Alert } from "@/components/ui/Alert/Alert";
import { CCreateViewSkeleton } from "../_skeletons/CCreateView.skeleton";
import { CCNameDescriptionPartial } from "./_partials/CCNameDescription.partial";
import { CCEnrolOptionsPartial } from "./_partials/CCEnrolOptions.partial";
import { CCInitialTrainingPartial } from "./_partials/CCInitialTraining.partial";
import { CCSkillTemplatePartial } from "./_partials/CCSkillTemplate.partial";
import { CCSelectMentorGroupPartial } from "./_partials/CCSelectMentorGroup.partial";

export function CourseCreateView() {
    const uuid = useRef<string>(generateUUID());
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { mentorGroups, loading, loadingError } = UserService.getCourseManagerMentorGroups();

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        CourseAdministrationService.create(data, navigate, setIsSubmitting);
    }

    return (
        <>
            <PageHeader title={"Kurs Erstellen"} hideBackLink />

            <RenderIf
                truthValue={loading}
                elementTrue={<CCreateViewSkeleton />}
                elementFalse={
                    <RenderIf
                        truthValue={loadingError != null}
                        elementTrue={<NetworkError error={loadingError?.error} closeable={false} />}
                        elementFalse={
                            <RenderIf
                                truthValue={mentorGroups.length == 0}
                                elementTrue={
                                    <Alert className={"mb-4"} type={TYPE_OPTS.DANGER} showIcon rounded>
                                        Du hast in keiner Mentorengruppe die Rechte Kurse zu verwalten oder anzulegen.
                                    </Alert>
                                }
                                elementFalse={
                                    <Card>
                                        <form onSubmit={handleFormSubmission}>
                                            <Input labelSmall label={"UUID"} preIcon={<TbId size={20} />} disabled value={uuid.current} />
                                            <Input className={"hidden"} name={"course_uuid"} value={uuid.current} />

                                            <Separator />

                                            <CCNameDescriptionPartial />
                                            <CCEnrolOptionsPartial />

                                            <Separator />

                                            <CCInitialTrainingPartial />

                                            <Separator />

                                            <CCSkillTemplatePartial />

                                            <Separator />

                                            <CCSelectMentorGroupPartial mentorGroups={mentorGroups} />

                                            <Separator />

                                            <Button
                                                type={"submit"}
                                                disabled={mentorGroups.length == 0}
                                                loading={isSubmitting}
                                                icon={<TbFilePlus size={20} />}
                                                variant={"twoTone"}
                                                color={COLOR_OPTS.PRIMARY}>
                                                {isSubmitting ? <>Kurs wird Erstellt</> : <>Kurs Erstellen</>}
                                            </Button>
                                        </form>
                                    </Card>
                                }
                            />
                        }
                    />
                }
            />
        </>
    );
}
