import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { Employee } from '../employees/employee.entity'

@Entity()
export class TimeRecord {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Employee, employee => employee.timeRecords)
  employee: Employee

  @Column()
  type: string

  @Column()
  time: string

  @Column()
  date: string

  @CreateDateColumn()
  createdAt: Date
}