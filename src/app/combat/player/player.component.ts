import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

constructor(private chiamataDeck:DeckService) {}

deckPlayer: iMonsters[] = []

monsterActive!: iMonsters
background:string = ""
hpCounter: number = 100
hp:string = `width: ${this.hpCounter}%`
staminaCounter: number = 100
stamina:string = `width: ${this.staminaCounter}%`

@Input() battleAnimationPlayer!: string
@Input() toggleAnimation!: boolean

@Output() battleAnimationEmit = new EventEmitter<{animation: string, toggle: boolean}>();

battleOutput() {
  this.battleAnimationPlayer = "battle 500ms ease-in-out";
  this.toggleAnimation = true;
  this.battleAnimationEmit.emit({
    animation: this.battleAnimationPlayer,
    toggle: this.toggleAnimation
  });
}



ngOnInit() {
this.chiamataDeck.deck$.subscribe(deckGlobal => {
  this.deckPlayer = deckGlobal
  this.monsterActive = this.deckPlayer[0]
  this.background = `url(${this.monsterActive.sfondo})`

})
}

}
