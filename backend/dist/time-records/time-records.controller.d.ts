import { TimeRecordsService } from './time-records.service';
import { TimeRecord } from './time-record.entity';
export declare class TimeRecordsController {
    private readonly service;
    constructor(service: TimeRecordsService);
    findAll(): Promise<TimeRecord[]>;
    findByEmployee(id: string): Promise<TimeRecord[]>;
    create(body: Partial<TimeRecord>): Promise<TimeRecord>;
}
