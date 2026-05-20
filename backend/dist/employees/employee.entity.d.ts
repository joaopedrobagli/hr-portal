import { TimeRecord } from '../time-records/time-record.entity';
export declare class Employee {
    id: number;
    name: string;
    role: string;
    department: string;
    email: string;
    status: string;
    createdAt: Date;
    timeRecords: TimeRecord[];
}
