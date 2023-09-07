import { Card } from "@/components/ui/Card/Card";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import CourseInformationService from "@/services/course/CourseInformationService";
import { EnrolRequirementItemComponent } from "@/pages/authenticated/course/course-enrol/_components/EnrolRequirementItem.component";
import { MapArray } from "@/components/conditionals/MapArray";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { CourseEnrolSkeleton } from "@/pages/authenticated/course/course-enrol/_skeletons/CourseEnrol.skeleton";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { Separator } from "@/components/ui/Separator/Separator";
import { TbCheckbox, TbDoorEnter, TbX } from "react-icons/tb";
import { useState } from "react";
import CourseService from "@/services/course/CourseService";
import ToastHelper from "@/utils/helper/ToastHelper";

type Requirement = {
    req_id: number;
    action: string;
    passed?: boolean;
};

export function CourseEnrolView() {
    const navigate = useNavigate();
    const { uuid: courseUUID } = useParams();
    const { courseRequirements, loading: loadingRequirements, allRequirementsSatisfied } = CourseInformationService.validateCourseRequirements(courseUUID);
    const [enrolling, setEnrolling] = useState<boolean>(false);

    function enrol() {
        setEnrolling(true);

        CourseService.enrol(courseUUID)
            .then(() => {
                navigate(`/course/active/${courseUUID}?r`);
                ToastHelper.success("Du wurdest erfolgreich in diesen Kurs eingeschrieben");
            })
            .catch(() => {
                ToastHelper.error("Es ist ein Fehler beim Einschreiben aufgetreten");
            })
            .finally(() => setEnrolling(false));
    }

    return (
        <>
            <PageHeader title={"Kurs Einschreibung"} />

            <RenderIf
                truthValue={loadingRequirements}
                elementTrue={<CourseEnrolSkeleton />}
                elementFalse={
                    <Card header={"Einschreibevoraussetzungen"} headerBorder>
                        <MapArray
                            data={courseRequirements}
                            mapFunction={(courseRequirement, index) => {
                                return <EnrolRequirementItemComponent key={index} action={courseRequirement.action} passed={courseRequirement.passed} />;
                            }}
                        />

                        <div className={courseRequirements.length > 0 ? "mt-5" : ""}>
                            <RenderIf
                                truthValue={allRequirementsSatisfied}
                                elementTrue={
                                    <p>
                                        Du <strong>erfüllst alle</strong> Voraussetzungen um dich in diesen Kurs einschreiben zu können!
                                    </p>
                                }
                                elementFalse={
                                    <p>
                                        Du <strong>erfüllst nicht alle</strong> Voraussetzungen um dich in diesen Kurs einschreiben zu können!
                                    </p>
                                }
                            />
                        </div>

                        <Separator />

                        <Button
                            color={COLOR_OPTS.PRIMARY}
                            variant={"twoTone"}
                            loading={loadingRequirements || enrolling}
                            disabled={!allRequirementsSatisfied}
                            icon={allRequirementsSatisfied ? <TbCheckbox size={20} /> : <TbX size={20} />}
                            onClick={enrol}>
                            {loadingRequirements ? "Lade Voraussetzungen" : "Jetzt Einschreiben"}
                        </Button>
                    </Card>
                }
            />
        </>
    );
}
