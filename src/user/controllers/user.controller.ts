import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/message')
  getGreeting(): string {
    return this.userService.getGreeting();
  }
}
