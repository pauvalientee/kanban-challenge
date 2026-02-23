import { Component, signal } from '@angular/core';
import {KanbanBoardComponent} from './components/kanban-board/kanban-board';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    KanbanBoardComponent, RouterModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kanbanFrontend');
}
