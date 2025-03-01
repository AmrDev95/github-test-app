import { createAction, props } from '@ngrx/store';
import {
  GithubRepository,
  UserModel,
  UsersListFilter,
  UserSuccessResponse,
} from './user.model';

export const SET_USERS_LIST_FILTER = createAction(
  '[Users List] update filter params',
  props<{ filter: UsersListFilter }>()
);

export const GET_USERS_LIST = createAction(
  '[Users list] search users',
  props<{ q: string | null; page: number; per_page: number }>()
);

export const GET_USERS_LIST_SUCCESS = createAction(
  '[Users Service] response retrieved from API',
  props<{ data: UserSuccessResponse }>()
);


export const GET_USER_DETAILS = createAction(
  '[Users list] Load Counter Success',
  props<{ username: string; searchParams: any }>()
);

export const GET_USER_DETAILS_SUCCESS = createAction(
  '[Users Service] users list returned successfully from API',
  props<{ userDetails: UserModel; githubRepositories: GithubRepository[] }>()
);

export const RESET_USER_DETAILS = createAction(
  '[User details page] reset user details'
);


export const GET_USER_REPOSITORIES = createAction(
  '[Users service] requested to get user repositories',
  props<{
    username: string;
    searchParams: { sort: string; page: number; per_page: number };
  }>()
);

export const GET_USER_REPOSITORIES_SUCCESS = createAction(
  '[Users service] repositories retrieved successfully',
  props<{ githubRepositories: GithubRepository[] }>()
);

export const RESET_USER_REPOSITORIES = createAction(
  '[User details component] reset user repos'
);
