import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GET_USERS_LIST, SET_USERS_LIST_FILTER } from '../../store/user.actions';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { UserModel, UsersListFilter } from '../../store/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { selectUsersList, selectUsersListFilter } from '../../store/user.selectors';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { EmptyListComponent } from "../../../../components/empty-list/empty-list.component";

@Component({
  selector: 'app-users-search',
  imports: [NgClass, NgIf, ReactiveFormsModule, UserCardComponent, MatPaginatorModule, EmptyListComponent],
  templateUrl: './users-search.component.html',
  styleUrl: './users-search.component.scss',
})
export class UsersSearchComponent implements OnInit {
  
  isList?: number;
  isMenu: boolean = false;

  private _store = inject(Store);
  private _unsubscribeAll:Subject<null> = new Subject<null>();

  filterObject:UsersListFilter;
  usersList:UserModel[] = [];
  searchControl:FormControl = new FormControl(null);

  ngOnInit(): void {
    this.getUsersList();
    this.detectFilterChanges();
    this.subscribeToSearchQueryChanges();
  }

  getUsersList(){
    this._store.select(selectUsersList).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (usersList) => {
        this.usersList = usersList;
        console.log(this.usersList);
      }
    );
  }

  detectFilterChanges(){
    this._store.select(selectUsersListFilter).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (filterObject) => {
        this.filterObject = filterObject;
        this.searchControl.patchValue(this.filterObject.q, {emitEvent:false});
        console.log(this.filterObject);
      }
    );
  }

  subscribeToSearchQueryChanges(){
    this.searchControl.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(500)
    ).subscribe(
      (q:string) => {
        if(q){
          this._store.dispatch(SET_USERS_LIST_FILTER({filter:{
          ...this.filterObject,
          q
        }}));

        this._store.dispatch(GET_USERS_LIST(this.filterObject));
        }
      }
    );
  }

  onPageChange(event:PageEvent){
    console.log(event.pageIndex+1);
    this._store.dispatch(SET_USERS_LIST_FILTER({filter:{
      ...this.filterObject,
      page:event.pageIndex + 1,
      per_page:event.pageSize
    }}));
    this._store.dispatch(GET_USERS_LIST(this.filterObject));
  }
}
