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


  // Funzione che riceve i danni calcolati e avvia l'animazione
  battle(event: { animation: string, toggle: boolean, damagePlayer: number, damageOpponent: number }) {
    this.battleAnimationPlayer = event.animation;
    this.battleAnimationOpponent = 'opponent 500ms ease-in-out'
    this.toggleAnimation = event.toggle;

    // Resetta le animazioni con un leggero ritardo
    setTimeout(() => {
      this.battleAnimationPlayer = 'none';
      this.battleAnimationOpponent = 'none';
      this.toggleAnimation = false;
    }, 500);
  }

}
