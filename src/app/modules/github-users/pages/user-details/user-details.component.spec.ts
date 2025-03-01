import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { lastValueFrom, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import {
  GET_USER_REPOSITORIES,
  RESET_USER_REPOSITORIES,
} from '../../store/user.actions';
import {
  selectUserDetails,
  selectUserRepositories,
} from '../../store/user.selectors';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: MockStore;
  const username = 'octocat';

  const userDetails = {
    login: 'octocat',
    name: 'Octocat User',
    avatar_url: 'https://example.com/avatar.jpg',
  } as any;

  const mockUserRepositories: any = [
    {
      id: 1,
      name: 'Repo 1',
      full_name: 'user/repo1',
      description: 'Test Repo 1',
    },
    {
      id: 2,
      name: 'Repo 2',
      full_name: 'user/repo2',
      description: 'Test Repo 2',
    },
  ];

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => username,
      },
    },
    params: of({ username: username }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    component.filterObject = { sort: 'created', page: 1, per_page: 10 };

    store.overrideSelector(selectUserDetails, userDetails);
    store.overrideSelector(selectUserRepositories, mockUserRepositories);
  });

  it('should create user details component', () => {
    expect(component).toBeTruthy();
  });

  it('should load more repos on load more button click', waitForAsync(() => {
    store.select(selectUserRepositories).subscribe((result) => {
      fixture.detectChanges();
      spyOn(store, 'dispatch');

      const button = fixture.debugElement.query(By.css('#load-more-button'))
        .nativeElement as HTMLButtonElement;
      expect(button).withContext('The button is not rendered').toBeTruthy();
      button.click();

      expect(component.filterObject.page)
        .withContext('counter is not incrementing as expected')
        .toBe(2);

      expect(store.dispatch).toHaveBeenCalledWith(
        GET_USER_REPOSITORIES({
          username,
          searchParams: {
            ...component.filterObject,
          },
        })
      );
    });
  }));

  it('should reset repos and add change sort param', waitForAsync(() => {
    store.select(selectUserRepositories).subscribe(async (result) => {
      fixture.detectChanges();
      spyOn(store, 'dispatch');

      const dropdown = fixture.debugElement.query(By.css('#select-dropdown'))
        .nativeElement as HTMLSelectElement;
      expect(dropdown).withContext('The button is not rendered').toBeTruthy();
      dropdown.value = 'updated';
      dropdown.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledTimes(2);

      expect(store.dispatch).toHaveBeenCalledWith(RESET_USER_REPOSITORIES());

      const currentRepos = await lastValueFrom(
        store.select(selectUserRepositories)
      );
      expect(currentRepos.length).toBe(0);

      expect(store.dispatch).toHaveBeenCalledWith(
        GET_USER_REPOSITORIES({
          username,
          searchParams: {
            ...component.filterObject,
          },
        })
      );
    });
  }));
});
