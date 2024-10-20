import { PlayerComponent } from './../player/player.component';
import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { BattleService } from '../../services/battle.service';
import { iMonsters } from '../../models/i-monsters';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent {


  playerClone!: iMonsters[]
  opponentClone!: iMonsters[]

  playerInGame!:iMonsters
  opponentInGame!:iMonsters

  battleAnimationPlayer: string = 'none';
  battleAnimationOpponent: string = 'none';
  toggleAnimation: boolean = false;

  constructor(private battleSvc: BattleService) {}

// FuNZIONE DI ESEMPIO, SE VOGLIO MODIFICARE LA BARRA DEVO MODIFICARE TUTTO L'OGGETTO
test(newHp:number):void {
  this.playerInGame = {...this.playerInGame, barraHp: newHp}
  console.log(this.playerInGame);


}



// BATTAGLIA!!!!!!!!
  battle(event: { animation: string, toggle: boolean, damagePlayer: number, damageOpponent: number, staminaPlayer:number, staminaOpponent:number }) {

    //GESTISCO LE ANIMAZIONI___________________________________________________
    this.battleAnimationPlayer = event.animation;
    this.battleAnimationOpponent = 'opponent 500ms ease-in-out'
    this.toggleAnimation = event.toggle;
    setTimeout(() => {
      this.battleAnimationPlayer = 'none';
      this.battleAnimationOpponent = 'none';
      this.toggleAnimation = false;
    }, 500);
//GESTISCO IL MOSTRO MORTO___________________________________________________
if (this.playerInGame.hp <= 0) {
  this.playerClone.splice(0, 1);
  if (this.playerClone.length > 0) {
    this.playerInGame = this.playerClone[0];
  }
}

if (this.opponentInGame.hp <= 0) {
  this.opponentClone.splice(0, 1);
  if (this.opponentClone.length > 0) {
    this.opponentInGame = this.opponentClone[0];
  }
}

//CALCOLO I DANNI E AGGIORNO LE BARRE
this.playerInGame.hp = event.damagePlayer
this.opponentInGame.hp = event.damageOpponent
this.playerInGame.stamina = event.staminaPlayer
this.opponentInGame.stamina = event.staminaOpponent
this.playerInGame.barraHp = (this.playerInGame.hp / this.playerClone[0].hp) * 100;
this.opponentInGame.barraHp = (this.opponentInGame.hp / this.opponentClone[0].hp) * 100;
this.playerInGame.barraStamina = (this.playerInGame.stamina / this.playerClone[0].stamina) * 100
this.opponentInGame.barraStamina = (this.opponentInGame.stamina / this.opponentClone[0].stamina) * 100
console.log("PLAYeR",this.playerClone[0]);
console.log("OPPO",this.opponentClone[0]);





//FINE FUNZIONE_________________________________________________
  }
//FINE FUNZIONE_________________________________________________


  // INIZIO NGONINIT_______________________________________________________________

  ngOnInit(): void {
    // Sottoscrizione per il deck del player
    this.battleSvc.player$.subscribe(playerDeck => {
      this.playerClone = JSON.parse(JSON.stringify(playerDeck)); // Deep copy del player deck
    if (this.playerClone) {
      this.playerInGame = this.playerClone[0]
    }
    });

    // Sottoscrizione per il deck dell'opponent
    this.battleSvc.opponent$.subscribe(opponentDeck => {
      this.opponentClone = JSON.parse(JSON.stringify(opponentDeck)); // Deep copy dell'opponent deck
    if(this.opponentClone) {
      this.opponentInGame = this.opponentClone[0]
    }
    });
  }


}
