import { Select } from "../../../../../../components/ui/Select/Select";
import { TbActivity, TbLock } from "react-icons/all";

export function CCEnrolOptionsPartial() {
    return (
        <>
            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                <Select
                    description={
                        "Wenn der Kurs aktiv ist, wird dieser in der Kurssuche angezeigt. Mentoren sind nur im aktiven Zustand in der Lage Mitglieder in Kursen hinzuzufügen - sofern dies nicht durch die Selbsteinschreibung geregelt ist."
                    }
                    label={"Kurs Aktiv"}
                    className={"mt-5 flex flex-col"}
                    labelSmall
                    required
                    name={"active"}
                    preIcon={<TbActivity size={20} />}>
                    <option value={1}>Ja</option>
                    <option value={0}>Nein</option>
                </Select>

                <Select
                    description={
                        "Wenn die Selbsteinschreibung aktiviert ist, können sich Mitglieder selber in diesen Kurs einschreiben. Falls nicht, geschieht dies über Mentoren oder das ATD."
                    }
                    label={"Selbsteinschreibung Aktiv"}
                    className={"mt-5 flex flex-col"}
                    selectClassName={"mt-auto"}
                    labelSmall
                    required
                    name={"self_enrol"}
                    preIcon={<TbLock size={20} />}>
                    <option value={1}>Ja</option>
                    <option value={0}>Nein</option>
                </Select>
            </div>
        </>
    );
}
