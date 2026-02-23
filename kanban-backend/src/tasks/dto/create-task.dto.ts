export class CreateTaskDto {
  title: string;
  description?: string;
  status?: 'TODO' | 'DOING' | 'DONE';
  user_id?: number;
}
