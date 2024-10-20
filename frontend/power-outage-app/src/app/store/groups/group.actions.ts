// src/app/store/actions/group.actions.ts
import { createAction, props } from '@ngrx/store';
import { CreateGroupDto } from 'src/app/admin/models/create-group.model';
import { Group } from 'src/app/shared/models/group.model';

export const loadGroups = createAction('[Group] Load Groups');
export const loadGroupsSuccess = createAction(
  '[Group] Load Groups Success',
  props<{ groups: Group[] }>()
);

export const loadGroupsFailure = createAction(
  '[Group] Load Groups Failure',
  props<{ error: string }>()
);

export const createGroup = createAction(
  '[Group] Create Group',
  props<{ group: CreateGroupDto }>()
);

export const createGroupSuccess = createAction(
  '[Group] Create Group Success',
  props<{ group: Group }>()
);

export const createGroupFailure = createAction(
  '[Group] Create Group Failure',
  props<{ error: string }>()
);

export const updateGroup = createAction(
    '[Group] Update Group',
    props<{ group: Group }>()
);


export const GroupActions ={
  loadGroups,
  loadGroupsSuccess,
  loadGroupsFailure,
  createGroup,
  createGroupSuccess,
  createGroupFailure,
  updateGroup
};