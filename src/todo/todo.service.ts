import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(taskData: CreateTodoDto): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, taskData: UpdateTodoDto): Promise<Task> {
    await this.taskRepository.update(id, taskData);
    const updatedTask = await this.taskRepository.findOne({ where: { id } });
    if (!updatedTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  async getTasks(page: number = 1, limit: number = 10, filters: any = {}): Promise<Task[]> {
    return this.taskRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async deleteTask(id: number): Promise<string> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    await this.taskRepository.remove(task);
    return `Task with id ${id} deleted successfully`;
  }
}
