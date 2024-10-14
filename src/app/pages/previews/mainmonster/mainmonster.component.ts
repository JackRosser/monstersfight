import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-mainmonster',
  templateUrl: './mainmonster.component.html',
  styleUrl: './mainmonster.component.scss'
})
export class MainmonsterComponent {
@Input() monstersList!: any
@Input() monsterBg!: any
@Input() monsterListActive!:any
}
