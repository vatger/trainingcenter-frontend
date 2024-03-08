import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { useSettingsSelector } from "@/app/features/settingsSlice";
import { AxiosError } from "axios";
import { Alert } from "@/components/ui/Alert/Alert";
import { TYPE_OPTS } from "@/assets/theme.config";

function findRatingTimes(data: any) {
    let times: any[] = [];

    for (const rating of ["s1", "s2", "s3", "c1", "c3"]) {
        if (rating in data) {
            const time = Math.round(Number(data[rating]));
            times.push({
                name: rating.toUpperCase(),
                time: time,
            });
        }
    }

    return times;
}

export function RatingTimesPartial({ data, loading, loadingError }: { data: any; loading: boolean; loadingError: AxiosError | undefined }) {
    const colorScheme = useSettingsSelector().colorScheme;

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        if (loading || data == null) return;

        setChartData(findRatingTimes(data));
    }, [loading]);

    return (
        <div className="card card-border rounded-md hover:shadow transition-shadow mt-5" role="presentation">
            <div className="card-body">
                <h6 className="font-semibold mb-4 text-sm">Lotsenstunden nach Rating</h6>
                <RenderIf
                    truthValue={loadingError != null}
                    elementTrue={
                        <Alert type={TYPE_OPTS.WARNING} showIcon rounded>
                            Es ist leider aktuell nicht möglich deine Lotsenstatistiken abzurufen. Versuche es später erneut.
                        </Alert>
                    }
                    elementFalse={
                        <RenderIf
                            truthValue={data == null}
                            elementTrue={
                                <div className={"flex justify-center mx-auto"}>
                                    <Spinner size={45} />
                                </div>
                            }
                            elementFalse={
                                <ResponsiveContainer height={240} width={"100%"}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid opacity={colorScheme == "dark" ? 0.3 : 0.8} strokeDasharray="5 5" />
                                        <XAxis stroke={colorScheme == "dark" ? "white" : ""} dataKey="name" />
                                        <YAxis stroke={colorScheme == "dark" ? "white" : ""} />
                                        <Tooltip cursor={{ opacity: colorScheme == "dark" ? 0.1 : 0.4 }} />
                                        <Bar dataKey="time" name={"Zeit (Std)"} fill="rgb(99 102 241)" opacity={0.75} />
                                    </BarChart>
                                </ResponsiveContainer>
                            }
                        />
                    }
                />
            </div>
        </div>
    );
}
