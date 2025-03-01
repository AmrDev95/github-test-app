import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.model';

export const SELECT_USER_STATE = createFeatureSelector<UserState>('usersReducer');

export const selectUsersList = createSelector(
    SELECT_USER_STATE,
  (state) => state.usersList
);

export const selectUsersListFilter = createSelector(
    SELECT_USER_STATE,
    (state) => state.usersListFilter
)

export const selectUserAndRepos = createSelector(
  SELECT_USER_STATE,
  (state) => {
    return {userDetails:state.userDetails, githubRepositories:state.userRepositories}
  }
);

export const selectUserDetails = createSelector(
  SELECT_USER_STATE,
  (state) => state.userDetails
);

export const selectUserRepositories = createSelector(
  SELECT_USER_STATE,
  (state) => state.userRepositories
);