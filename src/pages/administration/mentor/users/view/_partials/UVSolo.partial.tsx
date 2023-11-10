import { UserModel } from "@/models/UserModel";
import { Card } from "@/components/ui/Card/Card";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbAdjustmentsCog, TbAlertTriangle, TbPlaylistAdd } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import React, { Dispatch, useState } from "react";
import { Badge } from "@/components/ui/Badge/Badge";
import { UVAddSoloModal } from "@/pages/administration/mentor/users/view/_modals/UVAddSolo.modal";
import { Input } from "@/components/ui/Input/Input";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { UVUseKontingentSoloModal } from "@/pages/administration/mentor/users/view/_modals/UVUseKontingentSolo.modal";
import { UVExtendSoloModal } from "@/pages/administration/mentor/users/view/_modals/UVExtendSolo.modal";

export function UVSoloPartial({ user, setUser }: { user?: UserModel; setUser: Dispatch<UserModel> }) {
    const [showAddSoloModal, setShowAddSoloModal] = useState<boolean>(false);
    const [showExtendSoloModal, setShowExtendSoloModal] = useState<boolean>(false);
    const [showUseKontingentSoloModal, setShowUseKontingentSoloModal] = useState<boolean>(false);

    const daysTillSoloEnd = Math.max(0, dayjs.utc(user?.user_solo?.current_solo_end).startOf("day").diff(dayjs.utc().startOf("day"), "day"));

    const kontingent = 30 * ((user?.user_solo?.extension_count ?? 0) + 1) - (user?.user_solo?.solo_used ?? 0);

    return (
        <>
            <Card
                header={"Solo"}
                headerBorder
                className={"mt-7"}
                headerExtra={
                    user?.user_solo == null ? (
                        <Badge color={COLOR_OPTS.WARNING}>Keine Solo hinterlegt</Badge>
                    ) : daysTillSoloEnd == 0 ? (
                        <div className={"flex"}>
                            <TbAlertTriangle className={"text-danger"} size={20} />
                            <Badge className={"ml-3"} color={COLOR_OPTS.DANGER}>
                                Abgelaufen, alle Freigaben entfernt
                            </Badge>
                        </div>
                    ) : undefined
                }>
                <RenderIf
                    truthValue={user?.user_solo == null}
                    elementTrue={
                        <Button
                            icon={<TbPlaylistAdd size={20} />}
                            size={SIZE_OPTS.SM}
                            onClick={() => {
                                setShowAddSoloModal(true);
                            }}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}>
                            Solo Hinzufügen
                        </Button>
                    }
                    elementFalse={
                        <>
                            <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"}>
                                <Input
                                    label={"Start"}
                                    description={"Start der aktuellen Solophase"}
                                    labelSmall
                                    disabled
                                    value={dayjs.utc(user?.user_solo?.current_solo_start).format(Config.DATE_FORMAT)}
                                />
                                <Input
                                    label={"Ende"}
                                    description={"Ende der aktuellen Solophase"}
                                    labelSmall
                                    disabled
                                    inputError={dayjs.utc(user?.user_solo?.current_solo_end).isBefore(dayjs.utc())}
                                    hideInputErrorText
                                    value={dayjs.utc(user?.user_solo?.current_solo_end).format(Config.DATE_FORMAT)}
                                />
                                <Input
                                    label={"Verbleibend"}
                                    description={"Verbleibende Tage der aktuellen Solophase"}
                                    labelSmall
                                    hideInputErrorText
                                    inputError={daysTillSoloEnd < 7 && daysTillSoloEnd != 0}
                                    disabled
                                    value={`${daysTillSoloEnd} Tag(e)`}
                                />
                                <Input
                                    label={"Kontingent"}
                                    description={"Verbleibende Tage die für Solo genutzt werden können"}
                                    labelSmall
                                    disabled
                                    value={`${kontingent} Tage`}
                                />
                                <Input
                                    label={"Verlängerungen"}
                                    description={"Anzahl der Verlängerungen"}
                                    labelSmall
                                    hideInputErrorText
                                    inputError={(user?.user_solo?.extension_count ?? 0) > 1}
                                    disabled
                                    value={user?.user_solo?.extension_count.toString()}
                                />
                                <Input
                                    label={"Vergeben durch"}
                                    description={"Mentor, der diese Solo vergeben hat"}
                                    labelSmall
                                    disabled
                                    value={`${user?.user_solo?.solo_creator?.first_name} ${user?.user_solo?.solo_creator?.last_name} (${user?.user_solo?.solo_creator?.id})`}
                                />
                            </div>

                            <RenderIf
                                truthValue={dayjs.utc(user?.user_solo?.current_solo_end).isBefore(dayjs.utc())}
                                elementTrue={
                                    // We need to check one of two cases:
                                    // 1. Either the user still has a kontingent to their name
                                    // in which case we can simply 'reinstate' the solo (but must select the endorsement group again)

                                    // 2. The user has NO contingent left and therefore MUST extend their solo

                                    // Both cases are quite similar but not the same - perhaps we want to use separate modals for clarity!
                                    <>TODO: SOLO VERLÄNGERN ODER "FORTFÜHREN"</>
                                }
                                elementFalse={
                                    <>
                                        <Button
                                            icon={<TbAdjustmentsCog size={20} />}
                                            size={SIZE_OPTS.SM}
                                            className={"mt-5"}
                                            disabled={kontingent == 0}
                                            onClick={() => {
                                                setShowUseKontingentSoloModal(true);
                                            }}
                                            variant={"twoTone"}
                                            color={COLOR_OPTS.PRIMARY}>
                                            Kontingent Nutzen
                                        </Button>

                                        <Button
                                            icon={<TbPlaylistAdd size={20} />}
                                            size={SIZE_OPTS.SM}
                                            className={"mt-5 ml-3"}
                                            onClick={() => {
                                                setShowExtendSoloModal(true);
                                            }}
                                            variant={"twoTone"}
                                            color={COLOR_OPTS.PRIMARY}>
                                            Solo Verlängern
                                        </Button>
                                    </>
                                }
                            />
                        </>
                    }
                />
            </Card>

            <UVAddSoloModal
                show={showAddSoloModal}
                onClose={() => {
                    setShowAddSoloModal(false);
                }}
                user={user}
                setUser={setUser}
            />
            <UVUseKontingentSoloModal
                show={showUseKontingentSoloModal}
                onClose={() => {
                    setShowUseKontingentSoloModal(false);
                }}
                user={user}
                setUser={setUser}
            />
            <UVExtendSoloModal
                show={showExtendSoloModal}
                onClose={() => {
                    setShowExtendSoloModal(false);
                }}
                user={user}
                setUser={setUser}
            />
        </>
    );
}