import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { OptimizationJob } from '../optimization-job.model';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  optimizationForm: FormGroup;

  validStatuses = ['RUNNING', 'COMPLETED', 'FAILED', 'PENDING'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public optimizationJob: OptimizationJob
  ) {
    this.optimizationForm = this.fb.group({
      name: [optimizationJob?.jobName || '', Validators.required],
      description: [optimizationJob?.description || ''],
      status: [optimizationJob?.status || '', [Validators.required, this.validateStatus.bind(this)]],
    });
  }

  validateStatus(control: any) {
    if (this.validStatuses.includes(control.value)) {
      return null;
    }
    return { invalidStatus: true };
  }

  onSave(): void {
    if (this.optimizationForm.valid) {
      this.dialogRef.close(this.optimizationForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
