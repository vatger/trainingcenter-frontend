import { TableColumn } from "react-data-table-component";
import { FastTrackRequestModel } from "../../../../../../models/FastTrackRequest.model";
import React from "react";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../configs/theme/theme.config";
import { Badge } from "../../../../../../components/ui/Badge/Badge";
import moment from "moment";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbEye } from "react-icons/all";

function getColumns(): TableColumn<FastTrackRequestModel>[] {
    return [
        {
            name: "Rating",
            selector: row => {
                switch (row.rating) {
                    case 0:
                        return "S2";

                    case 1:
                        return "S3";

                    default:
                        return "N/A";
                }
            },
        },
        {
            name: "Status",
            cell: row => {
                switch (row.status) {
                    case 0:
                        return <Badge color={COLOR_OPTS.PRIMARY}>Requested</Badge>;
                    case 1:
                        return <Badge color={COLOR_OPTS.PRIMARY}>Uploaded, Test requested</Badge>;
                    case 2:
                        return <Badge color={COLOR_OPTS.WARNING}>Test failed</Badge>;
                    case 3:
                        return <Badge color={COLOR_OPTS.SUCCESS}>Intro done</Badge>;
                    case 4:
                        return <Badge color={COLOR_OPTS.DANGER}>Request denied</Badge>;
                }
            },
        },
        {
            name: "Erstellt Am",
            selector: row => moment(row.createdAt).utc().format("DD.MM.YYYY"),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button className={"my-3"} size={SIZE_OPTS.SM} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbEye size={20} />}>
                        Ansehen
                    </Button>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
