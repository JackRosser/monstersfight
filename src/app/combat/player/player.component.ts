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
playerHpGraphic!:string
playerStaminaGraphic!:string
playerHp!: number
playerStamina!: number

ngOnInit() {
  this.battleSvc.player$.subscribe(monster => {
    this.playerMonster = monster
    if(this.playerMonster) {
    this.background = `url(${monster.sfondo})`
    }

    this.battleSvc.playerHp$.subscribe(hp => {
      this.playerHp = hp
      if(this.playerHp) {
        this.playerHpGraphic = `${this.playerHp}%`
      }
    })

    this.battleSvc.playerStamina$.subscribe(stamina => {
      this.playerStamina = stamina
      if(this.playerStamina) {
        this.playerStaminaGraphic = `${this.playerStamina}%`
      }
    })

  })

}


}
