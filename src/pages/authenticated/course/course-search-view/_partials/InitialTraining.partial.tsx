import { CourseModel } from "../../../../../models/CourseModel";
import { Card } from "../../../../../components/ui/Card/Card";
import { Input } from "../../../../../components/ui/Input/Input";
import React from "react";
import { TbId } from "react-icons/all";

function getTypeString(type: "online" | "sim" | "cpt" | "lesson") {
    switch (type) {
        case "lesson":
            return "Gruppenstunde (Lesson)";

        case "sim":
            return "Sim-Session";

        case "cpt":
            return "Controller Practical Test (CPT)";

        case "online":
            return "Online-Session";
    }
}

export function InitialTrainingPartial(props: { course: CourseModel | undefined }) {
    return (
        <Card header={"Erstes Training"} className={"mt-7"} headerBorder>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <Input preIcon={<TbId size={20} />} label={"Name"} disabled value={props.course?.training_type?.name} />

                <Input preIcon={<TbId size={20} />} label={"Typ"} disabled value={getTypeString(props.course?.training_type?.type ?? "online")} />
            </div>
        </Card>
    );
}
