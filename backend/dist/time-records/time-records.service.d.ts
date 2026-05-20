import { Repository } from 'typeorm';
import { TimeRecord } from './time-record.entity';
export declare class TimeRecordsService {
    private repo;
    constructor(repo: Repository<TimeRecord>);
    findAll(): Promise<TimeRecord[]>;
    findByEmployee(employeeId: number): Promise<TimeRecord[]>;
    create(data: Partial<TimeRecord>): Promise<TimeRecord>;
}
