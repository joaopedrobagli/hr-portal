import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeRecord } from './time-record.entity';

@Injectable()
export class TimeRecordsService {
  constructor(
    @InjectRepository(TimeRecord)
    private repo: Repository<TimeRecord>,
  ) {}

  findAll() {
    return this.repo.find({ relations: { employee: true } });
  }

  findByEmployee(employeeId: number) {
    return this.repo.find({
      where: { employee: { id: employeeId } },
      relations: { employee: true },
    });
  }

  create(data: Partial<TimeRecord>) {
    const record = this.repo.create(data);
    return this.repo.save(record);
  }
}