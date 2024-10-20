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

  constructor(private chiamataPlayer: DeckService, private battleSvc: BattleService) {}

  playerInCombat!: iMonsters;
  opponentInCombat!: iMonsters;

  // Animazioni di battaglia
  battleAnimationPlayer: string = 'none';
  battleAnimationOpponent: string = 'none';
  toggleAnimation: boolean = false;

  // Funzione che riceve i dati dalla battaglia e avvia l'animazione
  battle(event: { animation: string, toggle: boolean, damagePlayer: number, damageOpponent: number }) {
    // Reset delle animazioni prima di attivarle
    this.battleAnimationPlayer = 'none';
    this.battleAnimationOpponent = 'none';
    this.toggleAnimation = event.toggle;

    // Invia il danno aggiornato al servizio BattleService
    this.battleSvc.updateHpPlayer(event.damagePlayer);
    this.battleSvc.updateHpOpponent(event.damageOpponent);

    // Avvia le animazioni con un leggero ritardo
    setTimeout(() => {
      if (this.toggleAnimation) {
        this.battleAnimationPlayer = event.animation;
        this.battleAnimationOpponent = 'opponent 500ms ease-in-out';
        this.toggleAnimation = !this.toggleAnimation;
      }
    }, 10);
  }

  ngOnInit() {
    // Ottieni i mostri in combattimento (player e opponent)
    combineLatest([
      this.chiamataPlayer.deck$,
      this.battleSvc.opponent$
    ]).subscribe(([cardPlayerInCombat, cardOpponentInCombat]) => {
      this.playerInCombat = cardPlayerInCombat[0];
      this.opponentInCombat = cardOpponentInCombat[0];

      // Invia i dati dei mostri al BattleService
      this.battleSvc.updateCardPlayer(this.playerInCombat);
      this.battleSvc.updateCardOpponent(this.opponentInCombat);
    });
  }
}
