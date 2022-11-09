import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getGreeting(): string {
    return 'Hola desde el servicio de Tasks';
  }
}
