export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'TODO' | 'DOING' | 'DONE';
}
