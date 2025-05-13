import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Task } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTask(createTodoDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['Pending', 'Done', 'In Progress', 'Paused'] })
  @ApiQuery({ name: 'priority', required: false, enum: ['Red', 'Yellow', 'Blue'] })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of tasks.' })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('isActive') isActive?: boolean,
  ) {
    const filters: any = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (isActive !== undefined) filters.isActive = isActive;
    return this.todoService.getTasks(Number(page), Number(limit), filters);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: number) {
    return this.todoService.getTaskById(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTask(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: number) {
    return this.todoService.deleteTask(id);
  }
}
