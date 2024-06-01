import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: +process.env.MYSQL_TCP_PORT,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Task],
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
