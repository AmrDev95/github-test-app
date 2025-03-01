import { ResolveFn } from '@angular/router';
import { GithubRepository, UserModel, UserState } from '../store/user.model';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { filter, take, tap } from 'rxjs';
import { selectUserAndRepos } from '../store/user.selectors';
import { GET_USER_DETAILS } from '../store/user.actions';

export const userDetailsResolver: ResolveFn<{
  userDetails: UserModel;
  githubRepositories: GithubRepository[];
}> = (route) => {
  const store = inject(Store<UserState>);

  const username = route.paramMap.get('username');

  return store.select(selectUserAndRepos).pipe(
    tap((userDetails) => {
      if (!userDetails.userDetails) {
        store.dispatch(
          GET_USER_DETAILS({
            username,
            searchParams: { sort: 'created', page: 1, per_page: 10 },
          })
        );
      }
    }),
    filter((userDetails) => !!userDetails.userDetails),
    take(1)
  );
};
