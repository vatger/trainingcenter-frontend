import { ManageAccountElementPartial } from "../_partials/ManageAccountElement.partial";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../assets/theme.config";
import { TbLogout, TbTrash } from "react-icons/all";

export function ManageAccountDangerPartial() {
    return (
        <>
            <p>
                Viele der hier vorhandenen Einstellungen können gefährlich sein und eventuell zum Datenverlust führen. Sie können sich negativ auf Deine
                Ausbildung auswirken und benötigen deshalb immer eine weitere Bestätigung. Die Aktionen können <strong className={"underline"}>nicht</strong>{" "}
                rückgängig gemacht werden.
            </p>

            <ManageAccountElementPartial
                break
                title={"Von allen Kursen abmelden"}
                element={
                    <Button block className={"ml-auto float-right"} icon={<TbLogout size={20} />} variant={"twoTone"} color={COLOR_OPTS.DANGER}>
                        Abmelden
                    </Button>
                }
            />

            <ManageAccountElementPartial
                break
                title={"Konto Löschen"}
                hideBottomBorder
                element={
                    <Button block className={"ml-auto float-right"} icon={<TbTrash size={20} />} variant={"twoTone"} color={COLOR_OPTS.DANGER}>
                        Löschen
                    </Button>
                }
            />
        </>
    );
}
