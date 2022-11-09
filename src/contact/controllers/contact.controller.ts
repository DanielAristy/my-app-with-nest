import { Controller, Get } from '@nestjs/common';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/message')
  getGreeting(): string {
    return this.contactService.getGreeting();
  }
}
