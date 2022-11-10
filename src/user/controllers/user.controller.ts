import { Controller, Param, Get, Post, Body, ValidationPipe, Delete, Put, Patch} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findById(@Param('uuid') uuid: string){
    return this.userService.findById(uuid)
  }

  @Post()
  createUser(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    user: UserDto,
  ): UserDto {
    return this.userService.createUser(user);
  }

  @Put(':uuid')
  updateUser(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    user: UserDto,
  ) {
    return this.userService.updateUser(uuid, user)
  }

  @Patch(':uuid')
  modifyUser(@Param('uuid') uuid: string,
  @Body(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  user: UserDto,) {
    return this.userService.modifyUser(uuid, user);
  }


  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string) {
    return this.userService.deleteUser(uuid)
  }
}