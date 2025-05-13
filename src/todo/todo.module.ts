import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
