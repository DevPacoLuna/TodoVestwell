import { IsNotEmpty } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  dueDate: string;

  parentTask: number;
}
