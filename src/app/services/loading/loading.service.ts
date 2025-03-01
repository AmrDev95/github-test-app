import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isPageLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  urlsMap:Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  controlPageLoading(url:string, loading:boolean):void{
    if(loading === true){
      this.isPageLoading.next(true);
      this.urlsMap.set(url, loading);
    }
    
    else if (loading === false && this.urlsMap.has(url)){
      this.urlsMap.delete(url);
    }

    if(this.urlsMap.size <= 0){
      this.isPageLoading.next(false);
    }
  }
}
