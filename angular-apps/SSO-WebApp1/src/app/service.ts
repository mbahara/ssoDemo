import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OptimizationJob } from './optimization-job.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptimizationJobService {
  private apiUrl = `${environment.apiURL}/optimizers`;

  constructor(private http: HttpClient) { }

  getOptimizationJobs(): Observable<OptimizationJob[]> {
    return this.http.get<OptimizationJob[]>(this.apiUrl);
  }

  addOptimizationJob(optimizationJob: OptimizationJob): Observable<OptimizationJob> {
    return this.http.post<OptimizationJob>(this.apiUrl, optimizationJob);
  }

  updateOptimizationJob(optimizationJob: OptimizationJob): Observable<OptimizationJob> {
    return this.http.put<OptimizationJob>(`${this.apiUrl}/${optimizationJob.id}`, optimizationJob);
  }

  deleteOptimizationJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
