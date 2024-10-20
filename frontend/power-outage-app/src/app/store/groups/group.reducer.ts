// group.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as GroupActions from './group.actions';
import { GroupState, initialState } from './group.state';

export const groupReducer = createReducer(
  initialState,

  on(GroupActions.loadGroups, (state) => ({
    ...state,
    loading: true,
  })),

  on(GroupActions.loadGroupsSuccess, (state, { groups }) => ({
    ...state,
    loading: false,
    groups,
  })),

  on(GroupActions.loadGroupsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(GroupActions.createGroup, (state) => ({
    ...state,
    loading: true,
  })),

  on(GroupActions.createGroupSuccess, (state, { group }) => ({
    ...state,
    loading: false,
    groups: [...state.groups, group],
  })),

  on(GroupActions.createGroupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(GroupActions.updateGroup, (state) => ({
    ...state,
    loading: true,
  }))
);