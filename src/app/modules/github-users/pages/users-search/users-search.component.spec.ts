import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UsersSearchComponent } from './users-search.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { GET_USERS_LIST, SET_USERS_LIST_FILTER } from '../../store/user.actions';
import { UsersListFilter } from '../../store/user.model'

describe('UsersSearchComponent', () => {
  let component: UsersSearchComponent;
  let fixture: ComponentFixture<UsersSearchComponent>;
  let store:Store;
  const filterParams:UsersListFilter = {page:1, per_page:10, q:null, total_count:0};
  const username = 'octocat';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSearchComponent, StoreModule],
      providers:[
        provideMockStore(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSearchComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.filterObject = filterParams;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch search users action when changing page event', () => {
    spyOn(store, 'dispatch');
    const paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;
    expect(paginator).toBeTruthy();
    paginator.page.emit({ pageIndex: 1, pageSize: 10, length: 100 });

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      GET_USERS_LIST({
        ...component.filterObject, 
      })
    );
  })

  it('should dispatch SET_USERS_LIST_FILTER and GET_USERS_LIST when searching using search bar', fakeAsync(() => {
    spyOn(store, 'dispatch');
    expect(component.searchControl).toBeTruthy();
    component.searchControl.patchValue(username);
    tick(1000); 
  
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  
    expect(store.dispatch).toHaveBeenCalledWith(
      SET_USERS_LIST_FILTER({
        filter: {
          ...component.filterObject,
          q: username,
        }
      })  
    );
  
    expect(store.dispatch).toHaveBeenCalledWith(
      GET_USERS_LIST({
        ...component.filterObject,
      })
    );
  }));
});
