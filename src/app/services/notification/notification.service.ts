import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { ToastrComponent } from '../../components/toastr/toastr.component';
import { DialogType } from './dialog.type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private _snackBar = inject(MatSnackBar);

  openToastr(type:DialogType, message:string){
    this._snackBar.openFromComponent(ToastrComponent, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      data: { message, type }
    });
  }
}
