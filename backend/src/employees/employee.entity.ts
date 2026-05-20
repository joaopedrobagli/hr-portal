import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { TimeRecord } from '../time-records/time-record.entity'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  role: string

  @Column()
  department: string

  @Column()
  email: string

  @Column({ default: 'Ativo' })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => TimeRecord, record => record.employee)
  timeRecords: TimeRecord[]
}