import { joinClassNames } from "../../../utils/helper/ClassNameHelper";

export function Separator(props: { className?: string }) {
    const classes = joinClassNames("w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-5", props.className ?? "");

    return <div className={classes} />;
}
