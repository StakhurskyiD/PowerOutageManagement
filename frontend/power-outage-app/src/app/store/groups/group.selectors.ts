// group.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.state';

export const selectGroupState = createFeatureSelector<GroupState>('groups');

export const selectGroups = createSelector(
    selectGroupState,
    (state: GroupState) => state.groups
  );
  
export const selectLoading = createSelector(
  selectGroupState,
  (state: GroupState) => state.loading
);
  
export const selectError = createSelector(
  selectGroupState,
  (state: GroupState) => state.error
);


export const GroupSelectors = {
  selectGroupState,
  selectGroups,
  selectLoading,
  selectError,
};