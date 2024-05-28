import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { IsNull, Repository } from 'typeorm';

export interface FiltersDTO {
  limit: string;
  page: string;
  status?: TaskStatus;
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

  async findAllFilter({ limit, page, status }: FiltersDTO) {
    const pageTasks = parseInt(page);
    const limitTasks = parseInt(limit);
    const [tasks, countTasks] = await this.tasksRepository.findAndCount({
      where: { status, parentTask: IsNull() },
      skip: limitTasks * (pageTasks <= 1 ? pageTasks : pageTasks - 1),
      take: limitTasks,
      loadRelationIds: true,
    });

    return {
      countTasks,
      tasks,
    };
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
