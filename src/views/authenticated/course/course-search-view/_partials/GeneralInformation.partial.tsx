import { CourseModel } from "../../../../../models/Course.model";
import { Card } from "../../../../../components/ui/Card/Card";
import { Badge } from "../../../../../components/ui/Badge/Badge";
import { COLOR_OPTS } from "../../../../../configs/theme/theme.config";
import { Input } from "../../../../../components/ui/Input/Input";
import React, { useState } from "react";
import { TbCertificate, TbCheckbox, TbClock, TbId } from "react-icons/all";
import { getAtcRatingLong, getAtcRatingShort } from "../../../../../utils/helper/vatsim/AtcRatingHelper";
import { TextArea } from "../../../../../components/ui/Textarea/TextArea";
import { Button } from "../../../../../components/ui/Button/Button";
import { EnrolModalPartial } from "./EnrolModal.partial";

function getDuration(data: any) {
    if (data == null) return "Keine Angabe";

    const duration = data.estimated_duration?.value;
    const unit = data.estimated_duration?.unit;

    return `${duration} ${unit}`;
}

function getAtcRating(rating: number | undefined): string {
    if (rating == null) return "Keine Angabe";

    const short = getAtcRatingShort(rating);
    const long = getAtcRatingLong(rating);
    return `${short} (${long})`;
}

export function GeneralInformationPartial(props: { course: CourseModel | undefined }) {
    const [showEnrolModal, setShowEnrolModal] = useState<boolean>(false);

    return (
        <>
            <Card header={"Allgemeine Informationen"} headerBorder headerExtra={<Badge color={COLOR_OPTS.DANGER}>Nicht eingeschrieben</Badge>}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"}>
                    <Input preIcon={<TbId size={20} />} label={"Name"} disabled value={props.course?.name} />

                    <Input preIcon={<TbId size={20} />} label={"UUID"} disabled value={props.course?.uuid} />

                    <Input preIcon={<TbClock size={20} />} label={"Ungefähre Dauer"} disabled value={getDuration(props.course?.information?.data)} />

                    <Input
                        preIcon={<TbCertificate size={20} />}
                        label={"Rating nach Abschluss"}
                        disabled
                        value={getAtcRating(props.course?.information?.data?.rating_on_complete)}
                    />
                </div>

                <TextArea disabled label={"Kursbeschreibung"} value={props.course?.description} />

                <Button
                    className={"mt-7"}
                    icon={<TbCheckbox size={20} />}
                    variant={"twoTone"}
                    color={COLOR_OPTS.PRIMARY}
                    onClick={() => setShowEnrolModal(true)}>
                    Jetzt Einschreiben
                </Button>
            </Card>

            <EnrolModalPartial course={props.course} show={showEnrolModal} onClose={() => setShowEnrolModal(false)} />
        </>
    );
}
