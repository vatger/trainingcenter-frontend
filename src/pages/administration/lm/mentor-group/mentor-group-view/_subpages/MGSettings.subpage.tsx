import { Input } from "../../../../../../components/ui/Input/Input";
import { TbEdit, TbId, TbMap2 } from "react-icons/all";
import { Select } from "../../../../../../components/ui/Select/Select";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../../assets/theme.config";
import { MentorGroupModel } from "../../../../../../models/MentorGroupModel";
import { Dispatch, FormEvent, useState } from "react";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

export function MGSettingsSubpage(props: {
    mentorGroup: MentorGroupModel | undefined;
    setMentorGroup: Dispatch<MentorGroupModel | undefined>;
    loading: boolean;
}) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    function update(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        if (props.mentorGroup == null) {
            return;
        }
        let newMentorGroup = { ...props.mentorGroup };
        newMentorGroup.name = data["name"];
        newMentorGroup.fir = data["fir"];

        axiosInstance
            .patch("/administration/mentor-group", {
                mentor_group_id: props.mentorGroup.id,
                ...data,
            })
            .then(() => {
                props.setMentorGroup(newMentorGroup);
                ToastHelper.success("Mentorengruppe erfolgreich aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Aktualisieren der Mentorengruppe");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <form onSubmit={update}>
            <Input
                name={"name"}
                type={"text"}
                maxLength={70}
                description={"Name der Mentorengruppe"}
                labelSmall
                placeholder={"Frankfurt Tower Mentoren"}
                label={"Name"}
                required
                regex={RegExp("^(?!\\s*$).+")}
                regexMatchEmpty
                regexCheckInitial
                value={props.mentorGroup?.name}
                preIcon={<TbId size={20} />}
            />

            <Select
                name={"fir"}
                label={"FIR"}
                preIcon={<TbMap2 size={20} />}
                className={"mt-5"}
                description={"FIR der Mentorengruppe"}
                labelSmall
                defaultValue={props.mentorGroup?.fir?.toLowerCase() ?? ""}>
                <option value={"-1"}>N/A</option>
                <option value={"edww"}>EDWW</option>
                <option value={"edgg"}>EDGG</option>
                <option value={"edmm"}>EDMM</option>
            </Select>

            <Separator />

            <Button type={"submit"} loading={submitting} icon={<TbEdit size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                Änderungen Speichern
            </Button>
        </form>
    );
}
