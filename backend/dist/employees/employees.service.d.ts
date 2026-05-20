import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
export declare class EmployeesService {
    private repo;
    constructor(repo: Repository<Employee>);
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee | null>;
    create(data: Partial<Employee>): Promise<Employee>;
    update(id: number, data: Partial<Employee>): Promise<Employee>;
    remove(id: number): Promise<Employee>;
}
