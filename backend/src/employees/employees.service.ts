import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private repo: Repository<Employee>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Employee>) {
    const employee = this.repo.create(data);
    return this.repo.save(employee);
  }

  async update(id: number, data: Partial<Employee>) {
    const employee = await this.repo.findOneBy({ id });
    if (!employee) throw new NotFoundException('Funcionário não encontrado');
    Object.assign(employee, data);
    return this.repo.save(employee);
  }

  async remove(id: number) {
    const employee = await this.repo.findOneBy({ id });
    if (!employee) throw new NotFoundException('Funcionário não encontrado');
    return this.repo.remove(employee);
  }
}