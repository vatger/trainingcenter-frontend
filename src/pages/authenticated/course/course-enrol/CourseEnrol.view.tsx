import { Card } from "@/components/ui/Card/Card";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import CourseInformationService from "@/services/course/CourseInformationService";
import { EnrolRequirementItemComponent } from "@/pages/authenticated/course/course-enrol/_components/EnrolRequirementItem.component";
import { MapArray } from "@/components/conditionals/MapArray";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

type Requirement = {
    req_id: number;
    action: string;
    passed?: boolean;
};

export function CourseEnrolView() {
    const { uuid: courseUUID } = useParams();
    const { courseRequirements, loading: loadingRequirements } = CourseInformationService.getCourseRequirements(courseUUID);

    const [requirementsSatisfied, setRequirementsSatisfied] = useState<boolean>(false);
    const [requirements, setRequirements] = useState<Requirement[]>([]);

    useEffect(() => {
        console.log(courseRequirements);

        if (courseRequirements != null && !loadingRequirements) {
            let requirements: Requirement[] = courseRequirements.map(cR => {
                return {
                    req_id: cR.req_id,
                    action: cR.action,
                    passed: undefined,
                };
            });

            setRequirements(requirements);

            axiosInstance
                .get("/course/info/requirements/validate", {
                    params: {
                        course_uuid: courseUUID,
                    },
                })
                .then((res: AxiosResponse) => {
                    const validated_ids = res.data as number[];
                    let new_requirements = [...requirements];
                    let satisfiesAll = true;

                    for (let i = 0; i < new_requirements.length; i++) {
                        if (validated_ids.includes(new_requirements[i].req_id)) {
                            new_requirements[i].passed = true;
                        } else {
                            satisfiesAll = false;
                        }
                    }

                    setRequirements(new_requirements);
                    setRequirementsSatisfied(satisfiesAll);
                })
                .catch((err: AxiosError) => {});
        }
    }, [loadingRequirements]);

    return (
        <>
            <PageHeader title={"Kurs Einschreibung"} />

            <Card header={courseUUID} headerBorder>
                <RenderIf
                    truthValue={loadingRequirements}
                    elementTrue={<></>}
                    elementFalse={
                        <MapArray
                            data={requirements}
                            mapFunction={(courseRequirement, index) => {
                                return <EnrolRequirementItemComponent key={index} action={courseRequirement.action} passed={courseRequirement.passed} />;
                            }}
                        />
                    }
                />

                <RenderIf truthValue={requirementsSatisfied} elementTrue={"YAY, SATISFIED!"} />
            </Card>
        </>
    );
}
