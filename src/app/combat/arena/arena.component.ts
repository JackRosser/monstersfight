import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss'
})
export class ArenaComponent {

constructor(private chiamataPlayer:DeckService, private chiamataOpponent:AllcardsService) {}

playerCards:iMonsters[] = []
opponentCards:iMonsters[] = []


  //ANIMAZIONE DI COMBATTIMENTO
  battleAnimationPlayer: string = "none";
  battleAnimationOpponent: string = "none";
  toggleAnimation: boolean = false;

  battle(event: {animation:string, toggle:boolean}) {

    this.battleAnimationPlayer = "none";
    this.battleAnimationOpponent = "none";
    this.toggleAnimation = event.toggle

  setTimeout(() => {
      if (this.toggleAnimation) {
        this.battleAnimationPlayer = event.animation
        this.battleAnimationOpponent = "opponent 500ms ease-in-out"
        this.toggleAnimation = !this.toggleAnimation;
      }
    }, 10);
  }

ngOnInit(){

this.chiamataPlayer.deck$.subscribe(deckImportato => {
  this.playerCards = deckImportato

})

this.chiamataOpponent.allCards$.subscribe(cardsOpponent => {
  this.opponentCards = cardsOpponent
})

}

}
