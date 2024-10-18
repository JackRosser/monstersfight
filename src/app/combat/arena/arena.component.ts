import { AllcardsService } from './../../services/allcards.service';
import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { iMonsters } from '../../models/i-monsters';
import { map, take } from 'rxjs';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss'
})
export class ArenaComponent {

constructor(private chiamataPlayer:DeckService, private chiamataOpponent:AllcardsService, private battleSvc:BattleService) {}



playerInCombat!: iMonsters
opponentInCombat!: iMonsters

// PLAYER

playerHp!:number
playerStamina!:number

// OPPONENT

opponentHp!:number
opponentStamina!:number


// ANIMAZIONE BATTAGLIA
  battleAnimationPlayer: string = "none";
  battleAnimationOpponent: string = "none";
  toggleAnimation: boolean = false;

  battle(event: {animation:string, toggle:boolean, danno:number}) {

    this.battleAnimationPlayer = "none";
    this.battleAnimationOpponent = "none";
    this.toggleAnimation = event.toggle
    this.playerHp = event.danno
    this.opponentHp = 50
    this.battleSvc.reduceHpOpponent(this.opponentHp)



  setTimeout(() => {
      if (this.toggleAnimation) {
        this.battleAnimationPlayer = event.animation
        this.battleAnimationOpponent = "opponent 500ms ease-in-out"
        this.toggleAnimation = !this.toggleAnimation;
      }
    }, 10);
  }








ngOnInit() {

this.chiamataPlayer.deck$.subscribe(cardPlayerInCombat => {
this.chiamataOpponent.allCards$.subscribe(cardOpponentInCombat => {
  this.playerInCombat = cardPlayerInCombat[0]
  this.opponentInCombat = cardOpponentInCombat[0]

  this.battleSvc.sendPlayerCards(this.playerInCombat)
  this.battleSvc.sendOpponentCards(this.opponentInCombat)

})

})

this.battleSvc.playerHp$.subscribe(hp => {
  this.playerHp = hp
})

this.battleSvc.playerStamina$.subscribe(stamina => {
  this.playerStamina = stamina
})

this.battleSvc.opponentHp$.subscribe(hp => {
  this.opponentHp = hp
})

this.battleSvc.opponentStamina$.subscribe(stamina => {
  this.opponentStamina = stamina
})

}


}
