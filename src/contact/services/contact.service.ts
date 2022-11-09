import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  getGreeting(): string {
    return 'Hola desde el servicio de Contacts';
  }
}
