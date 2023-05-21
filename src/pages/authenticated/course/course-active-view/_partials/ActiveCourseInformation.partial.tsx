import { RequestTrainingModalPartial } from "./RequestTrainingModal.partial";
import { CourseModel } from "../../../../../models/CourseModel";
import { Card } from "../../../../../components/ui/Card/Card";
import { Badge } from "../../../../../components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../assets/theme.config";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbCalendar, TbCertificate, TbChevronsRight, TbId } from "react-icons/all";
import moment from "moment";
import { getAtcRatingCombined } from "../../../../../utils/helper/vatsim/AtcRatingHelper";
import { Button } from "../../../../../components/ui/Button/Button";
import React, { Dispatch } from "react";
import { TrainingRequestModel } from "../../../../../models/TrainingRequestModel";

type ActiveCourseInformationPartialProps = {
    showRequestTrainingModal: boolean;
    setShowRequestTrainingModal: Dispatch<boolean>;
    setTrainingRequests: Dispatch<TrainingRequestModel[]>;
    course?: CourseModel;
    loadingCourse: boolean;
    trainingRequests: TrainingRequestModel[];
};

export function ActiveCourseInformationPartial(props: ActiveCourseInformationPartialProps) {
    return (
        <>
            <RequestTrainingModalPartial
                show={props.showRequestTrainingModal}
                onClose={() => props.setShowRequestTrainingModal(false)}
                course={props.course ?? ({} as CourseModel)}
                setTrainingRequests={props.setTrainingRequests}
            />

            <Card header={"Allgemeine Informationen"} headerBorder headerExtra={<Badge color={COLOR_OPTS.PRIMARY}>Eingeschrieben</Badge>}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                    <Input preIcon={<TbId size={20} />} label={"UUID"} disabled value={props.course?.uuid} />
                    <Input preIcon={<TbId size={20} />} label={"Kurs Name"} disabled value={props.course?.name} />
                    <Input
                        preIcon={<TbCalendar size={20} />}
                        label={"Eingeschrieben am"}
                        disabled
                        value={moment(props.course?.UsersBelongsToCourses?.createdAt).utc().format("DD.MM.YYYY HH:mm") + "Z"}
                    />
                    <Input
                        preIcon={<TbCertificate size={20} />}
                        label={"Rating nach Abschluss"}
                        disabled
                        value={getAtcRatingCombined(props.course?.information?.data?.rating_on_complete)}
                    />
                    <Input
                        preIcon={<TbCertificate size={20} />}
                        label={"Endorsement nach Abschluss"}
                        disabled
                        value={getAtcRatingCombined(props.course?.information?.data?.rating_on_complete)}
                    />
                </div>

                <Button
                    className={"mt-7"}
                    disabled={props.trainingRequests.length > 0}
                    loading={props.loadingCourse || props.course?.UsersBelongsToCourses?.next_training_type == null}
                    icon={<TbChevronsRight size={20} />}
                    size={SIZE_OPTS.SM}
                    onClick={() => props.setShowRequestTrainingModal(true)}
                    variant={"twoTone"}
                    color={COLOR_OPTS.PRIMARY}>
                    Training Beantragen
                </Button>
            </Card>
        </>
    );
}
