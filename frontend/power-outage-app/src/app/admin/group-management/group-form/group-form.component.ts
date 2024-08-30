import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../../shared/services/group.service';
import { Group } from '../../../shared/models/group.model';

@Component({
  selector: 'group-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  @Input() group: Group = new Group(); // Input for editing existing group
  @Output() save = new EventEmitter<Group>(); // Output for emitting save event

  groupForm!: FormGroup; // Use '!' to tell TypeScript it will be initialized

  constructor(private fb: FormBuilder, private groupService: GroupService) {}

  ngOnInit(): void {
    // Initialize form with default or existing group values
    this.groupForm = this.fb.group({
      id: [this.group.id],
      name: [this.group.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.group.description, [Validators.required, Validators.maxLength(250)]],
    });
  }

  isInvalidAndTouched(field: string): boolean {
    return this.groupForm.controls[field].invalid && this.groupForm.controls[field].touched;
  }

  onSave(): void {
    if (this.groupForm.valid) {
      const groupData = this.groupForm.value;

      if (groupData.id) {
        this.groupService.updateGroup(groupData.id, groupData).subscribe(() => {
          this.save.emit(groupData);
        });
      } else {
        this.groupService.createGroup(groupData).subscribe((newGroup) => {
          this.save.emit(newGroup);
        });
      }
    } else {
      this.groupForm.markAllAsTouched();
    }
  }
}