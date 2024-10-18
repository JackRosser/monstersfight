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
  @Input() playerHp!: number
  @Input() playerStamina!: number

  // Output per emettere eventi di animazione di battaglia
  @Output() battleAnimationEmit = new EventEmitter<{ animation: string, toggle: boolean }>();

  // Funzione che emette l'evento per l'animazione
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;
    this.battleAnimationEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation
    });
  }

playerMonster!:iMonsters
background!:string
playerHpGraphic:string = `${this.playerHp}%`
playerStaminaGraphic:string = `${this.playerStamina}%`
playerMonsterReceved:boolean = false


ngOnInit() {
  this.battleSvc.player$.subscribe(monster => {
    this.playerMonster = monster
    this.background = `url(${monster.sfondo})`
    this.playerMonsterReceved = true
  })
}


}
