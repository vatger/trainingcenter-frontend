import { CourseModel } from "@/models/CourseModel";
import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS } from "@/assets/theme.config";
import { Input } from "@/components/ui/Input/Input";
import { TbCertificate, TbCheckbox, TbClock, TbId } from "react-icons/all";
import { getAtcRatingLong, getAtcRatingShort } from "@/utils/helper/vatsim/AtcRatingHelper";
import { TextArea } from "@/components/ui/Textarea/TextArea";
import { Button } from "@/components/ui/Button/Button";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { useNavigate } from "react-router-dom";

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
    return `${long} (${short})`;
}

export function CVGeneralPartial(props: { course: (CourseModel & { enrolled?: boolean }) | undefined }) {
    const navigate = useNavigate();

    return (
        <>
            <Card
                header={"Allgemeine Informationen"}
                headerBorder
                headerExtra={
                    props.course?.enrolled ? (
                        <Badge color={COLOR_OPTS.PRIMARY}>Eingeschrieben</Badge>
                    ) : (
                        <Badge color={COLOR_OPTS.DANGER}>Nicht eingeschrieben</Badge>
                    )
                }>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"}>
                    <Input labelSmall preIcon={<TbId size={20} />} label={"Name"} disabled value={props.course?.name} />

                    <Input labelSmall preIcon={<TbId size={20} />} label={"UUID"} disabled value={props.course?.uuid} />

                    <Input labelSmall preIcon={<TbClock size={20} />} label={"Ungefähre Dauer"} disabled value={getDuration(props.course?.information?.data)} />

                    <Input
                        labelSmall
                        preIcon={<TbCertificate size={20} />}
                        label={"Rating nach Abschluss"}
                        disabled
                        value={getAtcRating(props.course?.information?.data?.rating_on_complete)}
                    />
                </div>

                <TextArea labelSmall disabled label={"Kursbeschreibung"} value={props.course?.description} />

                <RenderIf
                    truthValue={props.course?.enrolled == null || !props.course.enrolled}
                    elementTrue={
                        <Button
                            className={"mt-7"}
                            disabled={props.course?.enrolled}
                            icon={<TbCheckbox size={20} />}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            onClick={() => navigate("enrol")}>
                            Jetzt Einschreiben
                        </Button>
                    }
                />
            </Card>
        </>
    );
}
