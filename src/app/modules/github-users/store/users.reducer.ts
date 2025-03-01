import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.model';
import {
  GET_USER_DETAILS_SUCCESS,
  GET_USER_REPOSITORIES_SUCCESS,
  GET_USERS_LIST,
  GET_USERS_LIST_SUCCESS,
  RESET_USER_DETAILS,
  RESET_USER_REPOSITORIES,
  SET_USERS_LIST_FILTER,
} from './user.actions';

export const initialState: UserState = {
  userDetails: null,
  usersList: [],
  usersListFilter: {
    q: null,
    page: 0,
    per_page: 12,
    total_count: 0,
  },
  userRepositories: [],
};

export const usersReducer = createReducer(
  initialState,

  on(GET_USERS_LIST, (state) => ({ ...state })),

  on(GET_USERS_LIST_SUCCESS, (state, { data }) => ({
    ...state,
    usersList: data.items,
    usersListFilter: {
      ...state.usersListFilter,
      total_count: data.total_count,
    },
  })),

  on(SET_USERS_LIST_FILTER, (state, newFilter) => ({
    ...state,
    usersListFilter: newFilter.filter,
  })),

  on(
    GET_USER_DETAILS_SUCCESS,
    (state, { userDetails, githubRepositories }) => ({
      ...state,
      userDetails,
      userRepositories: githubRepositories,
    })
  ),

  on(RESET_USER_DETAILS, (state) => ({
    ...state,
    userDetails: null,
    userRepositories: [],
  })),

  on(GET_USER_REPOSITORIES_SUCCESS, (state, { githubRepositories }) => ({
    ...state,
    userRepositories: [...state.userRepositories, ...githubRepositories],
  })),

  on(RESET_USER_REPOSITORIES, (state) => ({
    ...state,
    userRepositories: [],
  }))
);
