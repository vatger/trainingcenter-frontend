import { PageHeader } from "../../../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../../../components/ui/Card/Card";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { TbEdit, TbPlus, TbTrash } from "react-icons/all";
import React, { useContext } from "react";
import { UserNoteSkeleton } from "../_skeletons/UserNote.skeleton";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { MapArray } from "../../../../../../components/conditionals/MapArray";
import UserNoteAdminService from "../../../../../../services/user/UserNoteAdminService";
import { useParams } from "react-router-dom";
import { UserNoteModel } from "../../../../../../models/UserNoteModel";
import moment from "moment";
import authContext from "../../../../../../utils/contexts/AuthContext";

export function ViewUserNotesView() {
    const { user_id } = useParams();
    const { user } = useContext(authContext);

    const { userNotes, loading: loadingUserNotes } = UserNoteAdminService.getGeneralUserNotes(user_id);

    return (
        <>
            <PageHeader title={"Benutzer Notizen"} />

            <Card
                header={"Notizen"}
                headerBorder
                headerExtra={
                    <Button size={SIZE_OPTS.XS} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                        Notiz Erstellen
                    </Button>
                }>
                <RenderIf
                    truthValue={loadingUserNotes}
                    elementTrue={
                        <MapArray
                            data={Array(4).fill(0)}
                            mapFunction={(value, index) => {
                                return <UserNoteSkeleton key={index} isFirst={index == 0} />;
                            }}
                        />
                    }
                    elementFalse={
                        <MapArray
                            data={userNotes}
                            mapFunction={(value: UserNoteModel, index) => {
                                return (
                                    <>
                                        <RenderIf truthValue={index > 0} elementTrue={<Separator />} />

                                        <div className={"mb-3"}>
                                            <div className={"flex justify-between"}>
                                                <div className={"flex flex-col"}>
                                                    <h6>
                                                        {value.user?.first_name + " " + value.user?.last_name} &#x2022;{" "}
                                                        {moment(value.createdAt).utc().format("DD.MM.YYYY")}
                                                    </h6>
                                                    <p className={"text-gray-400 dark:text-gray-400"}>{value.uuid}</p>
                                                </div>
                                                <RenderIf
                                                    truthValue={value.user?.id == user?.id}
                                                    elementTrue={
                                                        <div className={"flex flex-row"}>
                                                            <Button
                                                                size={SIZE_OPTS.SM}
                                                                className={"my-auto mr-2"}
                                                                icon={<TbEdit size={20} />}
                                                                variant={"twoTone"}
                                                                color={COLOR_OPTS.PRIMARY}></Button>
                                                            <Button
                                                                size={SIZE_OPTS.SM}
                                                                className={"my-auto"}
                                                                icon={<TbTrash size={20} />}
                                                                variant={"twoTone"}
                                                                color={COLOR_OPTS.DANGER}></Button>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                            <div className={"mt-5"}>{value.content}</div>
                                        </div>
                                    </>
                                );
                            }}
                        />
                    }
                />
            </Card>
        </>
    );
}

/*
                <Separator/>
                <div className={"mb-3"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex flex-col"}>
                            <h6>Nikolas Görlitz &#x2022; 20.12.2023</h6>
                            <p className={"text-gray-300"}>486e05cc-5ab9-44c0-821e-0bc8a2c498d3</p>
                        </div>
                        <Button size={SIZE_OPTS.SM} className={"my-auto"} icon={<TbTrash size={20}/>} variant={"twoTone"} color={COLOR_OPTS.DANGER}></Button>
                    </div>
                    <div className={"mt-5"}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </div>
                </div>
 */
