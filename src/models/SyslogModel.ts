export type SyslogModel = {
    id: number;
    user_id?: string;
    path: string;
    method: string;
    remote_addr?: string;
    createdAt: Date;
    updatedAt: Date;
};
