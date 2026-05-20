import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
export declare class EmployeesController {
    private readonly service;
    constructor(service: EmployeesService);
    findAll(): Promise<Employee[]>;
    findOne(id: string): Promise<Employee | null>;
    create(body: Partial<Employee>): Promise<Employee>;
    update(id: string, body: Partial<Employee>): Promise<Employee>;
    remove(id: string): Promise<Employee>;
}
