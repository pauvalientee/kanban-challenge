import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css'
})
export class KanbanBoardComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks: any[] = [];
  editingTaskId: number | null = null;
  editForm = { title: '', description: '' };

  newTask = {
    title: '',
    description: ''
  };

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error(err)
    });
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.newTask = { title: '', description: '' };
      },
      error: (err) => console.error(err)
    });
  }

  updateStatus(id: number, newStatus: string) {
    this.taskService.updateTaskStatus(id, newStatus).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => console.error(err)
    });
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter(t => t.status === status);
  }

  deleteTask(id: number) {
    if (confirm('¿Estás seguro?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error(err)
      });
    }
  }

  onEditTask(task: any) {
    this.editingTaskId = task.id;
    this.editForm = {
      title: task.title,
      description: task.description
    };
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  saveEdit(taskId: number) {
    console.log('Guardando tarea:', taskId, this.editForm);

    this.taskService.updateTask(taskId, this.editForm).subscribe({
      next: () => {
        this.editingTaskId = null;
        this.loadTasks();
      },
      error: (err) => console.error('Error en el servidor:', err)
    });
  }
}
