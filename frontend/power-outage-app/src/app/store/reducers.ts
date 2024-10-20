// src/app/store/reducers.ts
import { ActionReducerMap } from '@ngrx/store';
import { GroupState } from './groups/group.state';
import { groupReducer } from './groups/group.reducer';

export interface AppState {
  groups: GroupState;
  // Add other state slices if needed
}

export const reducers: ActionReducerMap<AppState> = {
  groups: groupReducer,
  // Add other reducers
};