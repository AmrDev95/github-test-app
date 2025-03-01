import { Component, Input } from '@angular/core';
import { UserModel } from '../../store/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input({required:true}) user:UserModel;

}
