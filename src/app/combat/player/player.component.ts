import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {


monsterActive!: iMonsters
background:string = ""
hpCounter: number = 100
hp:string = `width: ${this.hpCounter}%`
staminaCounter: number = 100
stamina:string = `width: ${this.staminaCounter}%`

@Input() battleAnimationPlayer!: string
@Input() toggleAnimation!: boolean
@Input() playerCard: iMonsters[] = []

@Output() battleAnimationEmit = new EventEmitter<{animation: string, toggle: boolean}>();

battleOutput() {
  this.battleAnimationPlayer = "battle 500ms ease-in-out";
  this.toggleAnimation = true;
  this.battleAnimationEmit.emit({
    animation: this.battleAnimationPlayer,
    toggle: this.toggleAnimation
  });
}



ngOnChanges(changes: SimpleChanges) {
  if (changes['playerCard'] && this.playerCard.length > 0) {
    this.monsterActive = this.playerCard[0];
    this.background = `url(${this.monsterActive.sfondo})`;
  }
}


}
