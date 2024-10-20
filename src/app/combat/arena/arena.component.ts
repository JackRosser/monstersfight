import { AllcardsService } from './../../services/allcards.service';
import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { iMonsters } from '../../models/i-monsters';
import { BattleService } from '../../services/battle.service';
import { iBattle } from '../../models/battle';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss'
})
export class ArenaComponent {

constructor(private chiamataPlayer:DeckService, private chiamataOpponent:AllcardsService, private battleSvc:BattleService) {}



playerInCombat!: iMonsters
opponentInCombat!: iMonsters

// DATI COMPLESSIVI STATISTICHE

playerStatistics!:iBattle
opponentStatistics!:iBattle

// DATI INDIVIDUALI STATISTICHE

playerHp!:number
playerStamina!:number


opponentHp!:number
opponentStamina!:number


// ANIMAZIONE BATTAGLIA
  battleAnimationPlayer: string = "none";
  battleAnimationOpponent: string = "none";
  toggleAnimation: boolean = false;

  battle(event: {animation:string, toggle:boolean, damagePlayer:number, damageOpponent:number}) {

    this.battleAnimationPlayer = "none";
    this.battleAnimationOpponent = "none";
    this.toggleAnimation = event.toggle
    // INVIO IL DANNO DI PLAYER E OPPONENT AL BEHAVIOR AGGIORNANDOLO
    this.battleSvc.updateHpPlayer(event.damagePlayer)
    this.battleSvc.updateHpOpponent(event.damageOpponent)
    //INVIO LE NUOVE CONDIZIONI DEL MOSTRO



  setTimeout(() => {
      if (this.toggleAnimation) {
        this.battleAnimationPlayer = event.animation
        this.battleAnimationOpponent = "opponent 500ms ease-in-out"
        this.toggleAnimation = !this.toggleAnimation;
      }
    }, 10);
  }








ngOnInit() {

// QUA DECIDO I MOSTRI ATTIVI VISUALIZZATI A SCHERMO

this.chiamataPlayer.deck$.subscribe(cardPlayerInCombat => {
this.chiamataOpponent.allCards$.subscribe(cardOpponentInCombat => {
  this.playerInCombat = cardPlayerInCombat[0]
  this.opponentInCombat = cardOpponentInCombat[0]

  this.battleSvc.sendPlayerCards(this.playerInCombat)
  this.battleSvc.sendOpponentCards(this.opponentInCombat)

})

})

this.battleSvc.playerStatistics$.subscribe(statistics => {
  this.playerStatistics = statistics

})

this.battleSvc.opponentStatistics$.subscribe(statistics => {
  this.opponentStatistics = statistics
})


}


}
