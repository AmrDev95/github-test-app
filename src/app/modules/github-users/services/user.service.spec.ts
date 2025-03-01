import { TestBed, waitForAsync } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  const username = 'octocat';
  const searchParams = { sort: 'created', page: 1, per_page: 10 };
  const userSearchParams = {q:null, page:1, per_page:10};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), UserService],
    });
    userService = TestBed.inject(UserService);
  });

  it('Should get user details along with user repos', waitForAsync(() => {
    userService.getUserDetails('octocat', searchParams).subscribe((result) => {
      expect(result.userDetails).withContext('user details should not be null').toBeTruthy();
      expect(result.userDetails.login).toBe(username);
      expect(Array.isArray(result.githubRepositories)).toBeTruthy(
        'Repos are not returned as an array'
      );
    });
  }));

  it('should get filtered repos', waitForAsync(() => {
    userService
      .getUserRespositories(username, searchParams)
      .subscribe({
        next:(result) => {
          expect(Array.isArray(result)).withContext('List should never return null').toBeTruthy();
        },
        error:(err:HttpErrorResponse) => {
          expect(err.error.message).withContext('Backend should return a descriptive error message').toBeTruthy();
        }
      });
  }));

  it('should get user list', waitForAsync(()=> {
    userService.getUsersList(userSearchParams).subscribe({
      next:(result) => {
        expect(result).withContext('List should never return null').toBeTruthy();
      },
      error:(err:HttpErrorResponse) => {
        expect(err.error.message).withContext('Backend should return a descriptive error message').toBeTruthy();
      }
    });
  }))
});
