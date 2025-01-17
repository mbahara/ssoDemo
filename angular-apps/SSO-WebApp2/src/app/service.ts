import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulationTask } from './simulation-task.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationTaskService {
  private apiUrl = 'http://localhost:9090/api/simulations'; // URL of the REST API

  constructor(private http: HttpClient) { }

  getTasks(): Observable<SimulationTask[]> {
    return this.http.get<SimulationTask[]>(this.apiUrl);
  }

  addTask(simulationTask: SimulationTask): Observable<SimulationTask> {
    return this.http.post<SimulationTask>(this.apiUrl, simulationTask);
  }

  updateTask(task: SimulationTask): Observable<SimulationTask> {
    return this.http.put<SimulationTask>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
