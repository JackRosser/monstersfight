import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrl: './previews.component.scss'
})
export class PreviewsComponent {

@Input() monstersList!: any;
@Input() monsterHover!: (monster: iMonsters) => void
@Input() borderActive!: string
@Input() activeBorder!: () string
}
