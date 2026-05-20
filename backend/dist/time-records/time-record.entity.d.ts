import { Employee } from '../employees/employee.entity';
export declare class TimeRecord {
    id: number;
    employee: Employee;
    type: string;
    time: string;
    date: string;
    createdAt: Date;
}
