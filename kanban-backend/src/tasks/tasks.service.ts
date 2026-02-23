import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user_id: userId,
    });
    return await this.taskRepository.save(newTask);
  }

  async findAll(userId: number): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    if (tasks.length === 0) {
      const seedTasks = [
        {
          title: 'Bienvenido al Kanban ',
          description: 'Esta es una tarea de ejemplo en la columna To Do.',
          status: 'TODO',
          user_id: userId,
        },
        {
          title: 'Tarea en progreso ',
          description: 'Esta tarea ya se está ejecutando.',
          status: 'DOING',
          user_id: userId,
        },
        {
          title: '¡Reto completado! ',
          description: 'Las tareas terminadas aparecen aquí.',
          status: 'DONE',
          user_id: userId,
        },
      ];

      await this.taskRepository.save(seedTasks);

      return await this.taskRepository.find({
        where: { user_id: userId },
        order: { created_at: 'DESC' },
      });
    }

    return tasks;
  }

  async updateStatus(id: number, status: string): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      status: status,
    });
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return await this.taskRepository.save(task);
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateData,
    });
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return await this.taskRepository.remove(task);
  }
}
