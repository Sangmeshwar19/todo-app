import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  PENDING = 'Pending',
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  PAUSED = 'Paused',
}

export enum Priority {
  RED = 'Red',
  YELLOW = 'Yellow',
  BLUE = 'Blue',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.BLUE,
  })
  priority: Priority;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
