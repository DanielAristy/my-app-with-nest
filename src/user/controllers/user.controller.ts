import { Controller, Param, Get, Post, Body, ValidationPipe, Delete, Put, Patch, UseGuards, UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { UserDto } from '../dtos/user.dto/user.dto';
import { Interceptor } from '../response.interceptor';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(Interceptor)
  @ApiResponse({ status: 200, type: [UserDto] })
  getAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  @UseInterceptors(Interceptor)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  findById(@Param('uuid') uuid: string){
    return this.userService.findById(uuid)
  }

  @Post()
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiBearerAuth()
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
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiBearerAuth()
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
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  deleteUser(@Param('uuid') uuid: string) {
    return this.userService.deleteUser(uuid)
  }
}