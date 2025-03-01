import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserAndRepos, selectUserDetails, selectUserRepositories } from '../../store/user.selectors';
import { AsyncPipe } from '@angular/common';
import { GET_USER_REPOSITORIES, RESET_USER_DETAILS, RESET_USER_REPOSITORIES } from '../../store/user.actions';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RepositoryCardComponent } from "../../components/repository-card/repository-card.component";
import { ActivatedRoute } from '@angular/router';
import { EmptyListComponent } from "../../../../components/empty-list/empty-list.component";

@Component({
  selector: 'app-user-details',
  imports: [AsyncPipe, MatTooltipModule, RepositoryCardComponent, EmptyListComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  private _store = inject(Store);
  private _activatedRoute = inject(ActivatedRoute);

  readonly userDetailsSelector = this._store.select(selectUserDetails);
  readonly userRepositories = this._store.select(selectUserRepositories);
  filterObject = {sort:'created', page:1, per_page:10};

  username:string = null;

  ngOnInit(): void {
    this.username = this._activatedRoute.snapshot.paramMap.get('username');
  }


  ngOnDestroy(): void {
    this._store.dispatch(RESET_USER_DETAILS());
  }

  onLoadMore(){
    this.filterObject.page++;
    this._store.dispatch(GET_USER_REPOSITORIES({username:this.username, searchParams:{...this.filterObject}}));
  }

  onSortChange(event:any){
    this.filterObject.sort = event.value;
    this._store.dispatch(RESET_USER_REPOSITORIES());
    this._store.dispatch(GET_USER_REPOSITORIES({username:this.username, searchParams:{...this.filterObject}}));
  }
}
