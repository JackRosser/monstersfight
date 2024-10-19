import { BattleService } from './../../services/battle.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  constructor(private battleSvc:BattleService) {

  }

// GESTIONE ANIMAZIONE BATTAGLIA

  @Input() battleAnimationPlayer!: string;
  @Input() toggleAnimation!: boolean;


  // Output per emettere eventi di animazione di battaglia
  @Output() battleEmit = new EventEmitter<{ animation: string, toggle: boolean, damagePlayer:number, damageOpponent:number }>();

  // Funzione che emette l'evento per l'animazione
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;

// QUA INIZIANO I CALCOLI PER I DANNI DEL PLAYER

// AVVERSARIO LEGGENDARIO: Aumento fisso per attacco e difesa
if (this.opponentMonster.forza === "tutto") {
  this.opponentMonster.atk += this.opponentMonster.atk * 0.2; // Aumento del 20% di attacco
  this.opponentMonster.def += this.opponentMonster.def * 0.2; // Aumento del 20% di difesa
}

// AVVERSARIO FORTE CONTRO DI ME E PIÙ VELOCE: Aumento ulteriore
if (this.playerMonster.debolezza === this.opponentMonster.forza && this.playerMonster.speed < this.opponentMonster.speed) {
  this.opponentMonster.atk *= 1.5 * 1.2; // Aumento del 150% seguito dal 20% in più
}

// AVVERSARIO PIÙ VELOCE DI ME: Aumento ulteriore, se non già incrementato
if (this.playerMonster.speed < this.opponentMonster.speed && !(this.playerMonster.debolezza === this.opponentMonster.forza)) {
  this.opponentMonster.atk += this.opponentMonster.atk * 0.2; // Aumento del 20%
}

// DANNO BASE: Calcolo del danno inflitto al giocatore
const damageToPlayer = this.opponentMonster.atk - (this.playerMonster.def * 0.15);
this.damagePlayer = this.playerMonster.hp -= damageToPlayer;


// QUA INIZIANO I CALCOLI PER I DANNI DELL'OPPO

// IO SONO LEGGENDARIO: Aumento fisso per attacco e difesa
if (this.playerMonster.forza === "tutto") {
  this.playerMonster.atk += this.playerMonster.atk * 0.2; // Aumento del 20% di attacco
  this.playerMonster.def += this.playerMonster.def * 0.2; // Aumento del 20% di difesa
}

// IO SONO PIÙ FORTE E PIÙ VELOCE: Aumento ulteriore
if (this.opponentMonster.debolezza === this.playerMonster.forza && this.opponentMonster.speed < this.playerMonster.speed) {
  this.playerMonster.atk *= 1.5 * 1.2; // Aumento del 150% seguito dal 20% in più
}

// IO SONO PIÙ VELOCE: Aumento ulteriore, se non già incrementato
if (this.opponentMonster.speed < this.playerMonster.speed && !(this.opponentMonster.debolezza === this.playerMonster.forza)) {
  this.playerMonster.atk += this.playerMonster.atk * 0.2; // Aumento del 20%
}

// DANNO BASE: Calcolo del danno inflitto all'avversario
const damageToOpponent = this.playerMonster.atk - (this.opponentMonster.def * 0.15);
this.damageOpponent = this.opponentMonster.hp -= damageToOpponent;



// INVIO DATI_____________________________
this.battleEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation,
      damagePlayer: this.damagePlayer,
      damageOpponent: this.damageOpponent
    });
  }

playerMonster!:iMonsters
background!:string
playerHp!: number
playerStamina!: number
playerHpGraphic!:string
playerStaminaGraphic!:string

// PARTE DI OPPONENT

opponentMonster!:iMonsters

// CALCOLO DANNI

damagePlayer!:number
damageOpponent!:number

ngOnInit() {
  this.battleSvc.player$.subscribe(monster => {
    this.playerMonster = monster
    if(this.playerMonster) {
    this.background = `url(${monster.sfondo})`
    }

 })

 this.battleSvc.playerStatistics$.subscribe(statistics => {
  this.playerHp = statistics.hp
  this.playerStamina = statistics.stamina
  if(this.playerHp && this.playerStamina) {
this.playerHpGraphic = `${this.playerHp}%`
this.playerStaminaGraphic = `${this.playerStamina}%`
  }
 })

this.battleSvc.opponent$.subscribe(monster => {
  this.opponentMonster = monster
})


}


}
