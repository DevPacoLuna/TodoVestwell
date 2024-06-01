import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.create({
      ...createTaskDto,
      user: { id: +userId },
    });
    return await this.tasksRepository.save(task);
  }

  async findAllFilter(userId: string, { limit, page, status }: FiltersDTO) {
    const pageTasks = parseInt(page);
    const limitTasks = parseInt(limit);
    const [tasks, countTasks] = await this.tasksRepository.findAndCount({
      where: { status, parentTask: IsNull(), user: { id: +userId } },
      skip: limitTasks * (pageTasks <= 1 ? pageTasks : pageTasks - 1),
      take: limitTasks,
      relations: {
        childTasks: true,
      },
    });

    return {
      countTasks,
      tasks,
    };
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({
      where: { id },
      relations: ['user', 'childTasks', 'parentTask'],
    });
  }

  async update(userId: number, id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    if (task.user.id !== userId) {
      throw new UnauthorizedException("Don't have rights to edit this task");
    }

    return await this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id);
  }
}
