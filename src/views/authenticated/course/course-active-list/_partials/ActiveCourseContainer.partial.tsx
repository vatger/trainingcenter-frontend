import { Card } from "../../../../../components/ui/Card/Card";
import { Link } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../configs/theme/theme.config";
import { CourseModel } from "../../../../../models/Course.model";
import { Badge } from "../../../../../components/ui/Badge/Badge";

export function ActiveCourseContainerPartial(props: { course: CourseModel }) {
    const cardHeader = (
        <div className={"md:self-end self-start text-left"}>
            <span className={"flex text-gray-500"}>
                <Badge color={COLOR_OPTS.PRIMARY}>Eingeschrieben</Badge>
            </span>
        </div>
    );

    const cardFooter = (
        <div className={"flex flex-col sm:flex-row"}>
            <Link to={props.course.uuid} className={"sm:mr-3 sm:mb-0 mb-3"}>
                <Button block variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                    Kurs Ansehen
                </Button>
            </Link>
        </div>
    );

    return (
        <Card
            className={"mt-5"}
            header={<h5 className={"font-bold self-start"}>{props.course.name}</h5>}
            headerBorder
            headerExtra={cardHeader}
            footer={cardFooter}
            footerClassName={"pt-0"}>
            <div className={"min-h-[40px]"}>{props.course.description}</div>
        </Card>
    );
}
