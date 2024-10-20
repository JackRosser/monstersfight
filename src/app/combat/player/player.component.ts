import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  constructor() {

  }

// GESTIONE ANIMAZIONE BATTAGLIA

  @Input() battleAnimationPlayer!: string;
  @Input() battleAnimationOpponent!: string;
  @Input() toggleAnimation!: boolean;


  // ESPORTO IL MOMENTO DEI DANNI COMPRESO DI ANIMAZIONE
  @Output() battleEmit = new EventEmitter<{ animation: string, toggle: boolean, damagePlayer:number, damageOpponent:number, staminaPlayer:number, staminaOpponent:number }>();

  // Funzione che emette l'evento per l'animazione
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;

// TOLGO HP

const dannoRicevutoDalPlayer = this.opponentInGame.atk - (this.playerInGame.def * 0.1);
this.playerInGame.hp -= dannoRicevutoDalPlayer;
this.damagePlayer = this.playerInGame.hp;

const dannoRicevutoDaOpponent = this.opponentInGame.atk - (this.playerInGame.def * 0.1);
this.opponentInGame.hp -= dannoRicevutoDaOpponent;
this.damageOpponent = this.opponentInGame.hp;

// TOLGO STAMINA

this.newStaminaPlayer = this.playerInGame.stamina - (this.playerInGame.stamina * 0.15)
this.newStaminaOpponent = this.opponentInGame.stamina - (this.opponentInGame.stamina * 0.15)

// INVIO DATI_____________________________
this.battleEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation,
      damagePlayer: this.damagePlayer,
      damageOpponent: this.damageOpponent,
      staminaPlayer: this.newStaminaPlayer,
      staminaOpponent: this.newStaminaOpponent
    });
  }


@Input() playerInGame!:iMonsters
@Input() opponentInGame!:iMonsters

player!:iMonsters
background!:string
barraHpPlayer!:string
barraStaminaPlayer!:string

// CALCOLO DANNI

damagePlayer!:number
damageOpponent!:number
newStaminaPlayer!:number
newStaminaOpponent!:number

// ASSEGNO I CAMBIAMENTI CON NGONCHANGES


ngOnChanges(changes: SimpleChanges) {

  if (changes['playerInGame'] && this.playerInGame) {
    this.updatePlayerData();
  }
}

updatePlayerData() {
  this.background = `url(${this.playerInGame.sfondo})`;
  this.barraHpPlayer = `${this.playerInGame.barraHp}%`;
  this.barraStaminaPlayer = `${this.playerInGame.barraStamina}%`;
}

}



