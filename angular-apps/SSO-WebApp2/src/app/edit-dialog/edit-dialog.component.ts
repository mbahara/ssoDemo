import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SimulationTask } from '../simulation-task.model';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  taskForm: FormGroup;

  validStatuses = ['RUNNING', 'COMPLETED', 'FAILED', 'PENDING'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: SimulationTask
  ) {
    this.taskForm = this.fb.group({
      name: [task?.taskName || '', Validators.required],
      status: [task?.status || '', [Validators.required, this.validateStatus.bind(this)]],
    });
  }

  validateStatus(control: any) {
    if (this.validStatuses.includes(control.value)) {
      return null;
    }
    return { invalidStatus: true };
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
