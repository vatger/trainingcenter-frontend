import {RenderIf} from "../../../components/conditionals/RenderIf";
import {NetworkError} from "../../../components/errors/NetworkError";
import React from "react";
import {APIResponseError} from "../../../exceptions/APIResponseError";
import {Alert} from "../../../components/ui/Alert/Alert";
import {TYPE_OPTS} from "../../../assets/theme.config";

export function LoginStatusPartial(props: { loadingError: APIResponseError }) {
    const url = new URL(window.location.toString());

    return (
        <>
            <RenderIf
                truthValue={props.loadingError == null && url.searchParams.get("logout") != null}
                elementTrue={
                    <div className={"mb-5"}>
                        <Alert rounded showIcon type={TYPE_OPTS.SUCCESS}>
                            Du wurdest erfolgreich abgemeldet. Bis zum nächsten Mal!
                        </Alert>
                    </div>
                }
            />

            <RenderIf
                truthValue={props.loadingError != null}
                elementTrue={
                    <div className={"mb-5"}>
                        <NetworkError error={props.loadingError?.error} closeable={false} />
                    </div>
                }
            />
        </>
    );
}
