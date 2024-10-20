import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '../../../shared/models/group.model';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { GroupActions } from 'src/app/store/groups/group.actions';
import { GroupSelectors, selectGroups } from 'src/app/store/groups/group.selectors';

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

  groupForm!: FormGroup;
  loading$!: Observable<boolean>;
  groups$!: any;


  constructor(private fb: FormBuilder, private store:Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(GroupSelectors.selectLoading);
    this.groups$ = this.store.select(selectGroups).pipe(tap(groups => console.log("Tap Test", groups)));

    console.log("SHOW GROUPS", this.groups$);

    this.groupForm = this.fb.group({
      id: [this.group.id || null],
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
        // Dispatch update action
        this.store.dispatch(GroupActions.updateGroup({ group: groupData }));
      } else {
        this.store.dispatch(GroupActions.createGroup({ group: groupData }));
      }
    } else {
      this.groupForm.markAllAsTouched();
    }
  }
}