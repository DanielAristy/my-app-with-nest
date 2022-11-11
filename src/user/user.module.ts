import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { HttpBodyMiddleware } from './body.middleware';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(HttpBodyMiddleware)
      .forRoutes(
        {path: 'user/:uuid', method: RequestMethod.PUT},
        {path: 'user/', method: RequestMethod.POST}
      )
  }
}
