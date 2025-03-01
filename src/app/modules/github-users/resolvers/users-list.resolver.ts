import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserModel, UserState } from '../store/user.model';
import {
  selectUsersList,
} from '../store/user.selectors';
import {
  filter,
  take,
  tap,
} from 'rxjs';
import { GET_USERS_LIST } from '../store/user.actions';

export const usersListResolver: ResolveFn<UserModel[]> = (route, state) => {
  const store = inject(Store<UserState>);

  return store.select(selectUsersList).pipe(
    tap((usersList) => {
      if (!usersList.length) {
        store.dispatch(GET_USERS_LIST({ q: null, page: 1, per_page: 12 }));
      }
    }),
    filter((usersList) => !!usersList.length),
    take(1)
  );
};
