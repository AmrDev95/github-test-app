import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DialogType } from '../../services/notification/dialog.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toastr',
  imports: [NgClass],
  templateUrl: './toastr.component.html'
})
export class ToastrComponent {
  
  dialogType = DialogType;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

}
