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
  @Output() battleEmit = new EventEmitter<{ animation: string, toggle: boolean, danno:number }>();

  // Funzione che emette l'evento per l'animazione
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;
    this.battleEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation,
      danno: this.playerMonster.atk
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
