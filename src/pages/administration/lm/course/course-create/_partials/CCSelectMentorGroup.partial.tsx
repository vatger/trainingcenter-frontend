import { TbActivity } from "react-icons/all";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { MapArray } from "../../../../../../components/conditionals/MapArray";
import { MentorGroupModel } from "../../../../../../models/MentorGroupModel";
import { Select } from "../../../../../../components/ui/Select/Select";

type CCSelectMentorGroupPartialProps = {
    mentorGroups: MentorGroupModel[];
};

export function CCSelectMentorGroupPartial(props: CCSelectMentorGroupPartialProps) {
    return (
        <>
            <Select
                description={
                    "Jeder Kurs muss einer Mentorengruppe zugewiesen werden. Die Administratoren dieser Mentorgruppe sind in der Lage den Kurs zu bearbeiten, oder neue in diese Gruppe hinzuzufügen. " +
                    "Falls mehrere Mentorengruppen sich diesen Kurs teilen, wähle zunächst eine Mentorgruppe aus, die diesen Kurs mentorieren soll und füge anschließend in der Kursübersicht die weiteren " +
                    "Mentorengruppen hinzu."
                }
                label={"Mentorgruppe"}
                className={"mt-5 flex flex-col"}
                labelSmall
                disabled={props.mentorGroups.length == 0}
                required
                name={"mentor_group_id"}
                preIcon={<TbActivity size={20} />}>
                <RenderIf
                    truthValue={props.mentorGroups.length == 0}
                    elementTrue={<option value={-1}>Du darfst in keiner Mentorgruppe Kurse verwalten.</option>}
                    elementFalse={
                        <MapArray
                            data={props.mentorGroups}
                            mapFunction={(value: MentorGroupModel, index) => {
                                return (
                                    <option key={index} value={value.id}>
                                        {value.name}
                                    </option>
                                );
                            }}
                        />
                    }
                />
            </Select>
        </>
    );
}
