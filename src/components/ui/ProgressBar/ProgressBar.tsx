import { RenderIf } from "../../conditionals/RenderIf";

export function ProgressBar(props: { value: number; text?: string; className?: string; hidePercentage?: boolean }) {
    return (
        <div className={"progress line " + (props.className ?? "")}>
            <div className="progress-wrapper">
                <div className="progress-inner">
                    <div className="progress-bg h-2 bg-indigo-600 transition-all" style={{ width: `${props.value}%` }} />
                </div>
            </div>
            <RenderIf
                truthValue={!props.hidePercentage}
                elementTrue={<span className="progress-info line pl-3 min-w-[50px] text-right">{props.text ?? `${props.value.toFixed(0)}%`}</span>}
            />
        </div>
    );
}
