import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import {
  GithubRepository,
  UserModel,
  UserSuccessResponse,
} from '../store/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersList = `https://api.github.com/search/users`;
  userDetails = `https://api.github.com/users`;
  userRepositories = 'https://api.github.com/users';

  constructor(private _httpClient: HttpClient) {}

  getUsersList(searchParams: any): Observable<UserSuccessResponse> {
    const { q, page, per_page } = searchParams;
    return this._httpClient.get<UserSuccessResponse>(
      `${this.usersList}?q=${q}&page=${page}&per_page=${per_page}`
    );
  }

  getUserDetails(
    username: string,
    searchParams: any
  ): Observable<{
    userDetails: UserModel;
    githubRepositories: GithubRepository[];
  }> {
    return this._httpClient
      .get<UserModel>(`${this.userDetails}/${username}`)
      .pipe(
        switchMap((userDetails) => {
          return this.getUserRespositories(username, searchParams).pipe(
            map((githubRepositories) => {
              return {
                userDetails,
                githubRepositories,
              };
            })
          );
        })
      );
  }

  getUserRespositories(username:string, searchParams: any): Observable<GithubRepository[]> {
    const { sort, page, per_page } = searchParams;
    return this._httpClient.get<GithubRepository[]>(
      `${this.userRepositories}/${username}/repos?sort=${sort}&page=${page}&per_page=${per_page}`
    );
  }
}
