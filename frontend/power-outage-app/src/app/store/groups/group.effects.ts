import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { GroupActions, loadGroups, loadGroupsFailure, loadGroupsSuccess } from "./group.actions";
import { group } from "@angular/animations";
import { GroupService } from "src/app/shared/services/group.service";




@Injectable()
export class GroupEffects{

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroups),
      mergeMap(() =>
        this.groupsService.getGroups().pipe(
          tap(groups => console.log('SHOW GROUPS IN EFFECT', groups)),
          map((groups) => loadGroupsSuccess({ groups })),
          catchError((error) => of(loadGroupsFailure({ error })))
        )
      )
    )
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.createGroup),
      mergeMap(({ group }) =>
        this.groupsService.createGroup(group).pipe(
          map((newGroup) => GroupActions.createGroupSuccess({ group: newGroup })),
          catchError((error) => of(GroupActions.createGroupFailure({ error })))
        )
      )
    )
  );

  createGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.createGroupSuccess),
      map(() => GroupActions.loadGroups())
    )
  );

  constructor(private actions$: Actions, private groupsService: GroupService) {}
}