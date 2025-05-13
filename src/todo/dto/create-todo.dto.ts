import { ApiProperty } from '@nestjs/swagger';
import { Status, Priority } from '../entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, format: 'date-time' })
  dueDate: Date;

  @ApiProperty({ enum: Status, default: Status.PENDING })
  status: Status;

  @ApiProperty({ enum: Priority, default: Priority.BLUE })
  priority: Priority;

  @ApiProperty({ default: true })
  isActive: boolean;
}
