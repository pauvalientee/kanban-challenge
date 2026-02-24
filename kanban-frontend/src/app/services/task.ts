import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'https://kanban-challenge-muxq.onrender.com/api/tasks';

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTask(task: { title: string, description: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, taskData: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, taskData);
  }
}
