// group.state.ts
import { Group } from 'src/app/shared/models/group.model';

export interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

export const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};