import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimulationTask } from './simulation-task.model';
import { SimulationTaskService } from './service'
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar'
import { OAuthService } from 'angular-oauth2-oidc';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SSO WebApp2 Simulator';
  displayedColumns: string[] = ['task', 'status', 'submitted', 'edit', 'delete'];
  tasks: SimulationTask[] = [];
  firstName = '';
  lastName = '';

  constructor(private taskService: SimulationTaskService, private oauthService: OAuthService, private dialog:MatDialog) {

  }

  ngOnInit(): void {
    this.loadTasks();
    let claims = this.oauthService.getIdentityClaims();
    this.firstName = claims['given_name'];
    this.lastName = claims['family_name'];
  }

  logout() {
    this.oauthService.logOut();
  }

  openDeleteDialog(task: SimulationTask) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result != null) {
        this.deleteBook(result);
      }
    });
  }

  openEditDialog(task: SimulationTask) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result: SimulationTask) => {
      if (result != null) {
        result['id'] = task.id;
        this.updateBook(result);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: SimulationTask[]) => {
      this.tasks = data;
    });
  }

  updateBook(book: SimulationTask): void {
    this.taskService.updateTask(book).subscribe(() => {
      this.loadTasks();
    });
  }


  deleteBook(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }


}
