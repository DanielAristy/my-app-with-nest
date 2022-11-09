import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getGreeting(): string {
    return 'Hola desde el servicio de Users';
  }
}
