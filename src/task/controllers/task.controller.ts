import { Controller, Get } from '@nestjs/common';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/message')
  getGreeting(): string {
    return this.taskService.getGreeting();
  }
}
