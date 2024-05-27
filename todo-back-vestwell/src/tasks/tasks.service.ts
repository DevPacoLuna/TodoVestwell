import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

export interface FiltersDTO {
  limit: string;
  page: string;
}
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(task);
  }

  findAllFilter({ limit, page }: FiltersDTO) {
    const pageTasks = parseInt(page);
    const limitTasks = parseInt(limit);
    return this.tasksRepository.find({
      skip: limitTasks * (pageTasks < 0 ? pageTasks : pageTasks - 1),
      take: limitTasks,
    });
  }

  findOne(id: number) {
    return this.tasksRepository.findBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id);
  }
}
