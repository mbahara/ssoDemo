import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptimizationJob } from './optimization-job.model';
import { OptimizationJobService } from './service';
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
  title = 'SSO WebApp1 Optimizer';
  displayedColumns: string[] = ['name', 'description', 'status', 'edit', 'delete'];
  optimizationJobs: OptimizationJob[] = [];
  firstName: string | null = null;
  lastName: string | null = null;

  constructor(private jobService: OptimizationJobService, private oauthService: OAuthService, private dialog:MatDialog) {

  }

  ngOnInit(): void {
    if (this.oauthService.hasValidAccessToken()){
      this.loadOptimizationJobs();
      let claims = this.oauthService.getIdentityClaims();
      this.firstName = claims['given_name'];
      this.lastName = claims['family_name'];
    }
  }

  logout() {
    this.oauthService.logOut();
  }

  openDeleteDialog(optimizationJob: OptimizationJob) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: optimizationJob,
    });

    dialogRef.afterClosed().subscribe((result: number | null) => {
      if (result != null) {
        this.deleteOptimizationJob(result);
      }
    });
  }

  openEditDialog(optimizationJob: OptimizationJob) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: optimizationJob,
    });

    dialogRef.afterClosed().subscribe((result: OptimizationJob | null) => {
      if (result != null) {
        result['id'] = optimizationJob.id;
        this.updateOptimizationJob(result);
      }
    });
  }

  loadOptimizationJobs(): void {
    this.jobService.getOptimizationJobs().subscribe((data: OptimizationJob[]) => {
      this.optimizationJobs = data;
    });
  }

  updateOptimizationJob(job: OptimizationJob): void {
    this.jobService.updateOptimizationJob(job).subscribe(() => {
      this.loadOptimizationJobs();
    });
  }


  deleteOptimizationJob(id: number): void {
    this.jobService.deleteOptimizationJob(id).subscribe(() => {
      this.loadOptimizationJobs();
    });
  }
}
