import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_REPOSITORIES,
  GET_USER_REPOSITORIES_SUCCESS,
  GET_USERS_LIST,
  GET_USERS_LIST_SUCCESS,
} from './user.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { combineLatest, from, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private _userService = inject(UserService);

  loadUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_USERS_LIST),
      mergeMap((action) =>
        this._userService.getUsersList(action).pipe(
          map((data) => GET_USERS_LIST_SUCCESS({ data }))
        )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_USER_DETAILS),
      mergeMap((action) =>
        this._userService
          .getUserDetails(action.username, action.searchParams)
          .pipe(
            map((data) =>
              GET_USER_DETAILS_SUCCESS({
                userDetails: data.userDetails,
                githubRepositories: data.githubRepositories,
              })
            )
          )
      )
    )
  );

  loadUserRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_USER_REPOSITORIES),
      mergeMap((action) =>
        this._userService
          .getUserRespositories(action.username, action.searchParams)
          .pipe(
            map((githubRepositories) =>
              GET_USER_REPOSITORIES_SUCCESS({
                githubRepositories
              })
            )
          )
      )
    )
  );
}
