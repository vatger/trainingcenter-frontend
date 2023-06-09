import { TableSkeleton } from "../../../../components/ui/Skeleton/TableSkeleton";
import React from "react";
import { Card } from "../../../../components/ui/Card/Card";
import { Skeleton } from "../../../../components/ui/Skeleton/Skeleton";

export function TrainingRequestSkeleton() {
    return (
        <Card header={<Skeleton width={250} height={28} />} headerBorder className={"mt-5"}>
            <Skeleton height={16} className={"mb-2"} />
            <TableSkeleton colCount={4} rowCount={4} />
        </Card>
    );
}
