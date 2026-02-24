import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    username: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.tasksService.updateStatus(+id, status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
