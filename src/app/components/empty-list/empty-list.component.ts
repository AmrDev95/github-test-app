import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  imports: [],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.scss'
})
export class EmptyListComponent {

  @Input() message:string = 'Looks kinda empty here';

}
