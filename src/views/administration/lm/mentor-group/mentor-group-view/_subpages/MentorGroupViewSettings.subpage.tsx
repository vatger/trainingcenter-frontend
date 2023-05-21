import { Input } from "../../../../../../components/ui/Input/Input";
import { TbCirclePlus, TbFilePlus, TbId, TbMap2, TbRefresh } from "react-icons/all";
import { Select } from "../../../../../../components/ui/Select/Select";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../configs/theme/theme.config";
import { MentorGroupModel } from "../../../../../../models/MentorGroup.model";
import { useState } from "react";

export function MentorGroupViewSettingsSubpage(props: { mentorGroup: MentorGroupModel | undefined; loading: boolean }) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    return (
        <form onSubmit={e => {}}>
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
                <option value={""}>N/A</option>
                <option value={"edww"}>EDWW</option>
                <option value={"edgg"}>EDGG</option>
                <option value={"edmm"}>EDMM</option>
            </Select>

            <Separator />

            <Button type={"submit"} loading={submitting} icon={<TbRefresh size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                Mentorengruppe Aktualisieren
            </Button>
        </form>
    );
}