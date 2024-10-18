import { AllcardsService } from './../../services/allcards.service';
import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { iMonsters } from '../../models/i-monsters';
import { map, take } from 'rxjs';

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


// PARTE DEL PLAYER
monsterInCombat!: iMonsters
playerHpValue:number = 100
playerStaminaValue:number = 100

//AGGIOrNO DINAMICAMENTE I DATI
get playerHp(): string {
  return `${this.playerHpValue}%`;
}

get playerStamina(): string {
  return `${this.playerStaminaValue}%`;
}


// PARTE DELL'OPPONENT

monsterOpponent!: iMonsters
opponentHpValue:number = 100
opponentStaminaValue:number = 100

get opponentHp(): string {
  return `${this.opponentHpValue}%`;
}

get opponentStamina(): string {
  return `${this.opponentStaminaValue}%`;
}

ngOnInit(){

this.chiamataPlayer.deck$.subscribe(deckImportato => {
  this.playerCards = deckImportato

  if(this.playerCards.length > 0) {
this.monsterInCombat = this.playerCards[0]

}


})

this.chiamataOpponent.allCards$.subscribe(deckAvversarioGlobale => {
this.opponentCards = deckAvversarioGlobale
})




}

}
