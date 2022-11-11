import { Controller, Param, Get, Post, Body, ValidationPipe, Delete, Put, Patch, UseGuards, UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { UserDto } from '../dtos/user.dto/user.dto';
import { Interceptor } from '../response.interceptor';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(Interceptor)
  getAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  @UseInterceptors(Interceptor)
  findById(@Param('uuid') uuid: string){
    return this.userService.findById(uuid)
  }

  @Post()
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @UseInterceptors(Interceptor)
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
  @UseGuards(AuthGuard)
  @UseInterceptors(Interceptor)
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
  @UseGuards(AuthGuard)
  deleteUser(@Param('uuid') uuid: string) {
    return this.userService.deleteUser(uuid)
  }
}