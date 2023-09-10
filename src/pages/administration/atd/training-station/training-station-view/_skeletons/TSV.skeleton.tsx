import { Card } from "@/components/ui/Card/Card";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { Separator } from "@/components/ui/Separator/Separator";
import React from "react";

export function TSVSkeleton() {
    return (
        <>
            <Card>
                <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                    <div>
                        <Skeleton height={20} width={200} />
                        <Skeleton height={40} className={"mt-2"} />
                    </div>

                    <div>
                        <Skeleton height={20} width={200} />
                        <Skeleton height={40} className={"mt-2"} />
                    </div>

                    <div>
                        <Skeleton height={20} width={200} />
                        <Skeleton height={40} className={"mt-2"} />
                    </div>

                    <div>
                        <Skeleton height={20} width={200} />
                        <Skeleton height={40} className={"mt-2"} />
                    </div>
                </div>

                <Separator />

                <div className={"flex flex-col lg:flex-row"}>
                    <Skeleton width={260} height={45} />
                    <Skeleton width={260} height={45} className={"mt-3 lg:mt-0 lg:ml-3"} />
                </div>
            </Card>
        </>
    );
}
