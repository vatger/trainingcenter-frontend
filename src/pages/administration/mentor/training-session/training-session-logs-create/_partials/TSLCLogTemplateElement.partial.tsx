import { ProgressBar } from "@/components/ui/ProgressBar/ProgressBar";
import { Separator } from "@/components/ui/Separator/Separator";
import { RenderIf } from "@/components/conditionals/RenderIf";
import {
    LogTemplateElement,
    LogTemplateElementRating,
    LogTemplateElementSection,
    LogTemplateElementTextarea,
    LogTemplateType,
} from "@/pages/administration/atd/log-template/log-template-create/_types/LTCElement.types";
import { TextArea } from "@/components/ui/Textarea/TextArea";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Select } from "@/components/ui/Select/Select";
import { TrainingTypeModel } from "@/models/TrainingTypeModel";
import { MapArray } from "@/components/conditionals/MapArray";
import StringHelper from "@/utils/helper/StringHelper";

function onValueChange<T>(map: Map<string, T>, uuid: string, value: T) {
    if (map.has(uuid)) {
        map.delete(uuid);
    }

    map.set(uuid, value);
}

function render(
    type: LogTemplateType | undefined,
    element: LogTemplateElement & { uuid: string },
    index: number,
    stringValues: Map<string, string>,
    progressValues: Map<string, number>
) {
    const [progressBarValue, setProgressBarValue] = useState<number>(0);

    let elem: any;
    switch (type) {
        case "textarea":
            elem = element as LogTemplateElementTextarea;
            return (
                <div>
                    <h6 className={elem.subtitle == null ? "mb-2" : ""}>{elem.title}</h6>
                    {elem.subtitle && <p className={"mb-2"}>{elem.subtitle}</p>}

                    <TextArea onChange={e => onValueChange<string>(stringValues, element.uuid, e.target.value)} placeholder={`Bewertung ${elem.title}`} />
                </div>
            );

        case "rating":
            elem = element as LogTemplateElementRating;
            return (
                <div className={"flex h-full flex-col xl:flex-row justify-between"}>
                    <div className={"flex flex-col w-full xl:w-1/2 xl:min-w-[420px]"}>
                        <div className={"flex justify-between"}>
                            <h6 className={"mb-2"}>{elem.title}</h6>
                            <span>
                                {progressBarValue} / {elem.max}
                            </span>
                        </div>
                        <div className={"flex flex-col h-full justify-between"}>
                            <ProgressBar value={(progressBarValue / elem.max) * 100} hidePercentage />
                            <Input
                                className={"mt-2"}
                                type={"number"}
                                labelSmall
                                value={progressBarValue.toString()}
                                onChange={e => {
                                    let val = Number(e.target.value);

                                    if (val == Number.NaN) {
                                        val = 0;
                                    }

                                    if (val > elem.max) {
                                        val = elem.max;
                                    }

                                    if (val < 0) {
                                        val = 0;
                                    }

                                    setProgressBarValue(val);
                                    onValueChange<number>(progressValues, element.uuid, val);
                                }}
                            />
                        </div>
                        {elem.subtitle != null && (
                            <div className={"mt-2"}>
                                <p>{elem.subtitle}</p>
                            </div>
                        )}
                    </div>
                    <div className={"w-full mt-6 xl:mt-0 xl:ml-6"}>
                        <RenderIf
                            truthValue={elem.disableText == null || elem.disableText == false}
                            elementTrue={
                                <TextArea
                                    onChange={e => onValueChange<string>(stringValues, element.uuid, e.target.value)}
                                    placeholder={`Bewertung ${elem.title}`}
                                />
                            }
                            elementFalse={<div className={"input h-full input-wrapper input-disabled resize-none "}>N/A</div>}
                        />
                    </div>
                </div>
            );

        case "section":
            elem = element as LogTemplateElementSection;
            return (
                <RenderIf
                    truthValue={index == 0}
                    elementTrue={<h4 className={"mb-0 underline"}>{elem.title}</h4>}
                    elementFalse={
                        <div className={"pt-4"}>
                            <Separator className={"mb-2"} />
                            <h4 className={"mb-2 underline"}>{elem.title}</h4>
                        </div>
                    }
                />
            );

        default:
            return (
                <div>
                    <h6 className={"mb-2"}>Bewertung</h6>

                    <TextArea onChange={e => onValueChange<string>(stringValues, element.uuid, e.target.value)} placeholder={`Bewertung`} />
                </div>
            );
    }
}

export function TSLCLogTemplateElementPartial(props: {
    element: LogTemplateElement & { uuid: string };
    index: number;
    availableTrainingTypes: TrainingTypeModel[];
    stringValues: Map<string, string>;
    progressValues: Map<string, number>;
    onPassedValueChange: (e: boolean) => any;
    onVisibilityValueChange: (e: boolean) => any;
    onNextTrainingValueChange: (e: number) => any;
}) {
    return (
        <>
            <div className={"flex relative flex-col md:flex-row justify-between " + (props.index == 0 || props.element.type == "section" ? "" : "mt-6")}>
                <div className={"w-full"}>{render(props.element.type, props.element, props.index, props.stringValues, props.progressValues)}</div>
            </div>

            <div className={"flex flex-col"}>
                <Checkbox className={"mt-5"} checked onChange={props.onPassedValueChange}>
                    Bestanden
                </Checkbox>
                <Checkbox className={"mt-3"} checked onChange={props.onVisibilityValueChange}>
                    Log Öffentlich (für den Trainee sichtbar)
                </Checkbox>
                <Select
                    label={"Nächstes Training"}
                    labelSmall
                    className={"mt-3"}
                    defaultValue={"-1"}
                    onChange={e => {
                        props.onNextTrainingValueChange(Number(e));
                    }}>
                    <option value={"-1"} disabled>
                        Nächstes Training Auswählen
                    </option>
                    <MapArray
                        data={props.availableTrainingTypes}
                        mapFunction={(t: TrainingTypeModel, index: number) => {
                            return (
                                <option key={index} value={t.id}>
                                    {t.name} ({StringHelper.capitalize(t.type)})
                                </option>
                            );
                        }}
                    />
                </Select>
            </div>
        </>
    );
}
