import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS } from "@/assets/theme.config";
import React from "react";

function getBadge(row: TrainingSessionModel) {
    if (row.cpt_atsim_passed && row.mentor_id != null && row.cpt_examiner_id != null) {
        return <Badge color={COLOR_OPTS.SUCCESS}>Bestätigt</Badge>;
    }

    if (row.mentor_id == null && row.cpt_examiner_id == null) {
        return <Badge color={COLOR_OPTS.DANGER}>Kein Mentor & Prüfer</Badge>;
    }

    if (row.mentor_id != null && row.cpt_examiner_id == null) {
        return <Badge color={COLOR_OPTS.DANGER}>Kein Prüfer</Badge>;
    }

    if (row.mentor_id == null && row.cpt_examiner_id != null) {
        return <Badge color={COLOR_OPTS.DANGER}>Kein Mentor</Badge>;
    }

    if (row.cpt_atsim_passed == false) {
        return <Badge color={COLOR_OPTS.DANGER}>ATSIM Nicht bestanden</Badge>;
    }
}

export default {
    getBadge,
};
