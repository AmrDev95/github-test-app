import { Component, Input } from '@angular/core';
import { GithubRepository } from '../../store/user.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-repository-card',
  imports: [MatTooltipModule],
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.scss'
})
export class RepositoryCardComponent {

  @Input({required:true}) respository:GithubRepository;

}
