import { Component } from '@angular/core';
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

battleAnimation: string = "none";
toggleAnimation: boolean = false;

battle() {

  this.battleAnimation = "none";
  this.toggleAnimation = true;

setTimeout(() => {
    if (this.toggleAnimation) {
      this.battleAnimation = "battle 500ms ease-in-out";
      this.toggleAnimation = !this.toggleAnimation;
    }
  }, 10);
}



ngOnInit() {
this.chiamataDeck.deck$.subscribe(deckGlobal => {
  this.deckPlayer = deckGlobal
  this.monsterActive = this.deckPlayer[0]
  this.background = `url(${this.monsterActive.sfondo})`

})
}

}
