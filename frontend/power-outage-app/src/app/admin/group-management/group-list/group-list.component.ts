import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../shared/services/group.service';
import { Group } from '../../../shared/models/group.model';
import { ItemsListComponent } from '../../../shared/components/items-list/items-list.component';
import { Observable, of } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadGroups } from 'src/app/store/groups/group.actions';
import { selectGroups, selectLoading } from 'src/app/store/groups/group.selectors';

@Component({
  selector: 'group-list',
  standalone: true,
  imports: [CommonModule, ItemsListComponent],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$!: Observable<Group[]>; // Use async pipe for groups data
  loading$!: Observable<boolean>; // Observable for loading state
  error$!: Observable<string | null>; // Observable for error messages

  constructor(private groupService: GroupService, private store: Store) {} //  private store: Store

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups(): void {
    this.store.dispatch(loadGroups());

    // Select the groups and loading state from the store
    this.groups$ = this.store.select(selectGroups);
    this.loading$ = this.store.select(selectLoading);
  }

  onGroupSelected(group: Group): void {
    console.log('Selected group:', group);
    // Handle group selection logic here, e.g., show details or navigate
  }
}