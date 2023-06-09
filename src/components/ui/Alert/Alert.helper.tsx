import { AlertProps } from "./Alert.props";
import { TYPE_OPTS } from "../../../assets/theme.config";
import { TbAlertTriangle, TbCircleCheck, TbCircleX, TbInfoCircle } from "react-icons/all";

export function getAlertIcon(props: AlertProps) {
    switch (props.type) {
        case TYPE_OPTS.INFO:
            return <TbInfoCircle size={21} className={"my-auto"} />;

        case TYPE_OPTS.DANGER:
            return <TbCircleX size={21} className={"my-auto"} />;

        case TYPE_OPTS.SUCCESS:
            return <TbCircleCheck size={21} className={"my-auto"} />;

        case TYPE_OPTS.WARNING:
            return <TbAlertTriangle size={21} className={"my-auto"} />;
    }
}
