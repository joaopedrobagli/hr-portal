import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TimeRecordsService } from './time-records.service';
import { TimeRecord } from './time-record.entity';

@Controller('time-records')
export class TimeRecordsController {
  constructor(private readonly service: TimeRecordsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:id')
  findByEmployee(@Param('id') id: string) {
    return this.service.findByEmployee(+id);
  }

  @Post()
  create(@Body() body: Partial<TimeRecord>) {
    return this.service.create(body);
  }
}