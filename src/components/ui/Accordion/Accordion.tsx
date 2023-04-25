import { ReactElement, useState } from "react";
import { TbChevronDown } from "react-icons/all";
import { RenderIf } from "../../conditionals/RenderIf";

export function Accordion(props: { expanded?: boolean; title?: string; children?: ReactElement | ReactElement[]; className?: string }) {
    const [expanded, setExpanded] = useState<boolean>(props.expanded ?? false);

    return (
        <div className={"w-full " + (props.className ?? "")}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={"flex justify-between p-3 bg-gray-100 hover:cursor-pointer " + (expanded ? "rounded-t" : "rounded")}>
                <h6 className={"text-sm font-semibold"}>{props.title}</h6>
                <TbChevronDown size={20} className={"transition-transform my-auto " + (expanded ? "rotate-180" : "")} />
            </div>
            <RenderIf truthValue={expanded} elementTrue={<div className={"rounded-b bg-gray-50"}>{props.children}</div>} />
        </div>
    );
}
