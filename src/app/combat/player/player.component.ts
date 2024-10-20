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
  @Output() battleEmit = new EventEmitter<{ animation: string, toggle: boolean, damagePlayer:number, damageOpponent:number }>();

  // Funzione che emette l'evento per l'animazione
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;

// QUA INIZIANO I CALCOLI PER I DANNI DEL PLAYER

// AVVERSARIO LEGGENDARIO: Aumento fisso per attacco e difesa
if (this.opponentInGame.forza === "tutto") {
  this.opponentInGame.atk += this.opponentInGame.atk * 0.2; // Aumento del 20% di attacco
  this.opponentInGame.def += this.opponentInGame.def * 0.2; // Aumento del 20% di difesa
}

// AVVERSARIO FORTE CONTRO DI ME E PIÙ VELOCE: Aumento ulteriore
if (this.playerInGame.debolezza === this.opponentInGame.forza && this.playerInGame.speed < this.opponentInGame.speed) {
  this.opponentInGame.atk *= 1.5 * 1.2; // Aumento del 150% seguito dal 20% in più
}

// AVVERSARIO PIÙ VELOCE DI ME: Aumento ulteriore, se non già incrementato
if (this.playerInGame.speed < this.opponentInGame.speed && !(this.playerInGame.debolezza === this.opponentInGame.forza)) {
  this.opponentInGame.atk += this.opponentInGame.atk * 0.2; // Aumento del 20%
}

// DANNO BASE: Calcolo del danno inflitto al giocatore
const damageToPlayer = this.opponentInGame.atk - (this.playerInGame.def * 0.15);
this.damagePlayer = this.playerInGame.hp -= damageToPlayer;


// QUA INIZIANO I CALCOLI PER I DANNI DELL'OPPO

// IO SONO LEGGENDARIO: Aumento fisso per attacco e difesa
if (this.playerInGame.forza === "tutto") {
  this.playerInGame.atk += this.playerInGame.atk * 0.2; // Aumento del 20% di attacco
  this.playerInGame.def += this.playerInGame.def * 0.2; // Aumento del 20% di difesa
}

// IO SONO PIÙ FORTE E PIÙ VELOCE: Aumento ulteriore
if (this.opponentInGame.debolezza === this.playerInGame.forza && this.opponentInGame.speed < this.playerInGame.speed) {
  this.playerInGame.atk *= 1.5 * 1.2; // Aumento del 150% seguito dal 20% in più
}

// IO SONO PIÙ VELOCE: Aumento ulteriore, se non già incrementato
if (this.opponentInGame.speed < this.playerInGame.speed && !(this.opponentInGame.debolezza === this.playerInGame.forza)) {
  this.playerInGame.atk += this.playerInGame.atk * 0.2; // Aumento del 20%
}

// DANNO BASE: Calcolo del danno inflitto all'avversario
const damageToOpponent = this.playerInGame.atk - (this.opponentInGame.def * 0.15);
this.damageOpponent = this.opponentInGame.hp -= damageToOpponent;



// INVIO DATI_____________________________
this.battleEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation,
      damagePlayer: this.damagePlayer,
      damageOpponent: this.damageOpponent
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



