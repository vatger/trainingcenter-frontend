import { Input } from "../../../../../../components/ui/Input/Input";
import { TbId } from "react-icons/all";
import { TextArea } from "../../../../../../components/ui/Textarea/TextArea";

/**
 * Contains the form elements of the form-creation that contains the name and description
 * @constructor
 */
export function CCNameDescriptionPartial() {
    return (
        <>
            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                <Input
                    name={"name_de"}
                    type={"text"}
                    maxLength={70}
                    description={"Name des Kurses"}
                    labelSmall
                    placeholder={"Frankfurt Tower Einweisung"}
                    label={"Name"}
                    required
                    regex={RegExp("^(?!\\s*$).+")}
                    regexMatchEmpty
                    regexCheckInitial
                    preIcon={<TbId size={20} />}
                />
                <Input
                    name={"name_en"}
                    type={"text"}
                    maxLength={70}
                    className={"mt-5 md:mt-0"}
                    description={"Name des Kurses in Englisch"}
                    labelSmall
                    placeholder={"Frankfurt Tower Endorsement"}
                    label={"Name (EN)"}
                    required
                    regex={RegExp("^(?!\\s*$).+")}
                    regexMatchEmpty
                    regexCheckInitial
                    preIcon={<TbId size={20} />}
                />
            </div>

            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                <div className={"mt-5"}>
                    <TextArea
                        label={"Beschreibung"}
                        description={"Beschreibung des Kurses"}
                        placeholder={"Die Frankfurt Tower Einweisung ist für alle Lotsen..."}
                        required
                        regex={RegExp("^(?!\\s*$).+")}
                        regexMatchEmpty
                        regexCheckInitial
                        labelSmall
                        name={"description_de"}
                    />
                </div>
                <div className={"mt-5"}>
                    <TextArea
                        label={"Beschreibung (EN)"}
                        description={"Beschreibung des Kurses auf Englisch"}
                        placeholder={"The Frankfurt Tower Endorsement is meant for all controllers..."}
                        required
                        regex={RegExp("^(?!\\s*$).+")}
                        regexMatchEmpty
                        regexCheckInitial
                        labelSmall
                        name={"description_en"}
                    />
                </div>
            </div>
        </>
    );
}
