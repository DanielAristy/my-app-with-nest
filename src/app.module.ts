import { Module } from '@nestjs/common';
import { AppController } from './main/app.controller';
import { AppService } from './main/app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [UserModule, TaskModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
