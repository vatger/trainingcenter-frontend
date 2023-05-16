import {Input} from "../../../../../../components/ui/Input/Input";
import {TbEdit, TbId, TbMap2} from "react-icons/all";
import {Select} from "../../../../../../components/ui/Select/Select";
import {Separator} from "../../../../../../components/ui/Separator/Separator";
import {Button} from "../../../../../../components/ui/Button/Button";
import {COLOR_OPTS} from "../../../../../../assets/theme.config";
import {MentorGroupModel} from "../../../../../../models/MentorGroup.model";
import {useState} from "react";

export function MentorGroupViewSettingsSubpage(props: { mentorGroup: MentorGroupModel | undefined; loading: boolean }) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    return (
        <form onSubmit={e => {
            e.preventDefault()
        }}>
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
                preIcon={<TbId size={20}/>}
            />

            <Select
                name={"fir"}
                label={"FIR"}
                preIcon={<TbMap2 size={20}/>}
                className={"mt-5"}
                description={"FIR der Mentorengruppe"}
                labelSmall
                defaultValue={props.mentorGroup?.fir?.toLowerCase() ?? ""}>
                <option value={""}>N/A</option>
                <option value={"edww"}>EDWW</option>
                <option value={"edgg"}>EDGG</option>
                <option value={"edmm"}>EDMM</option>
            </Select>

            <Separator/>

            <Button type={"submit"} loading={submitting} icon={<TbEdit size={20}/>} variant={"twoTone"}
                    color={COLOR_OPTS.PRIMARY}>
                Änderungen Speichern
            </Button>
        </form>
    );
}
