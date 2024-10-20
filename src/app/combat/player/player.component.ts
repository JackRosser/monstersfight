import { BattleService } from './../../services/battle.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor(private battleSvc: BattleService) {}

  // Input e Output per l'animazione e l'evento di battaglia
  @Input() battleAnimationPlayer!: string;
  @Input() toggleAnimation!: boolean;
  @Output() battleEmit = new EventEmitter<{ animation: string, toggle: boolean, damagePlayer: number, damageOpponent: number }>();

  // Funzione per gestire l'output dell'animazione di battaglia
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;

    // Diminuisci la stamina del player e dell'opponent del 10%
    this.playerMonster.stamina -= 10;
    this.opponentMonster.stamina -= 10;

    // Se la stamina di uno dei due è <= 0, imposta atk a 0
    if (this.playerMonster.stamina <= 0) {
      this.playerMonster.stamina = 0;
      this.playerMonster.atk = 0;
    }

    if (this.opponentMonster.stamina <= 0) {
      this.opponentMonster.stamina = 0;
      this.opponentMonster.atk = 0;
    }

    // Aggiorna le barre della vita e della stamina
    this.updateBars();

    // Calcoli per i danni al player
    if (this.opponentMonster.atk > 0) {
      if (this.opponentMonster.forza === "tutto") {
        this.opponentMonster.atk += this.opponentMonster.atk * 0.2;
        this.opponentMonster.def += this.opponentMonster.def * 0.2;
      }

      if (this.playerMonster.debolezza === this.opponentMonster.forza && this.playerMonster.speed < this.opponentMonster.speed) {
        this.opponentMonster.atk *= 1.5 * 1.2;
      }

      if (this.playerMonster.speed < this.opponentMonster.speed && !(this.playerMonster.debolezza === this.opponentMonster.forza)) {
        this.opponentMonster.atk += this.opponentMonster.atk * 0.2;
      }

      const damageToPlayer = this.opponentMonster.atk - (this.playerMonster.def * 0.15);
      this.damagePlayer = this.playerMonster.hp -= damageToPlayer;
    }

    // Calcoli per i danni all'opponent
    if (this.playerMonster.atk > 0) {
      if (this.playerMonster.forza === "tutto") {
        this.playerMonster.atk += this.playerMonster.atk * 0.2;
        this.playerMonster.def += this.playerMonster.def * 0.2;
      }

      if (this.opponentMonster.debolezza === this.playerMonster.forza && this.opponentMonster.speed < this.playerMonster.speed) {
        this.playerMonster.atk *= 1.5 * 1.2;
      }

      if (this.opponentMonster.speed < this.playerMonster.speed && !(this.opponentMonster.debolezza === this.playerMonster.forza)) {
        this.playerMonster.atk += this.playerMonster.atk * 0.2;
      }

      const damageToOpponent = this.playerMonster.atk - (this.opponentMonster.def * 0.15);
      this.damageOpponent = this.opponentMonster.hp -= damageToOpponent;
    }

    // Emetti l'evento con i dettagli della battaglia
    this.battleEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation,
      damagePlayer: this.damagePlayer,
      damageOpponent: this.damageOpponent
    });
  }

  // Funzione per aggiornare le barre della vita e della stamina
  updateBars() {
    this.playerHpBar = `${this.playerMonster.hp}%`;
    this.playerStaminaBar = `${this.playerMonster.stamina}%`;
  }

  // Variabili del componente
  playerMonster!: iMonsters;
  background!: string;
  playerHpBar!: string;
  playerStaminaBar!: string;
  opponentMonster!: iMonsters;
  damagePlayer!: number;
  damageOpponent!: number;

  // OnInit per ottenere i dati dal servizio
  ngOnInit() {
    this.battleSvc.player$.subscribe(monster => {
      this.playerMonster = monster[0];
      if (this.playerMonster) {
        this.background = `url(${monster[0].sfondo})`;
        this.updateBars(); // Aggiorna subito le barre
      }
    });

    this.battleSvc.opponent$.subscribe(monster => {
      this.opponentMonster = monster[0];
    });
  }
}
