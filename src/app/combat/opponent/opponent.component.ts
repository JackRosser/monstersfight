import { Component, Input, SimpleChanges } from '@angular/core';
import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from '../../models/i-monsters';
import { BattleService } from '../../services/battle.service';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrl: './opponent.component.scss'
})
export class OpponentComponent {

  constructor(private battleSvc:BattleService) {

  }

// ANIMAZIONE
@Input() battleAnimationOppoent!: string
@Input() toggleAnimation!: boolean


opponentMonster!:iMonsters
background!:string
opponentHpGraphic!:string
opponentStaminaGraphic!:string
opponentHp!: number
opponentStamina!: number

ngOnInit() {
  this.battleSvc.opponent$.subscribe(monster => {
    this.opponentMonster = monster
    if(this.opponentMonster) {
      this.background = `url(${monster.sfondo})`
      }
  })

  this.battleSvc.opponentHp$.subscribe(hp => {
    this.opponentHp = hp
    if(this.opponentHp) {
      this.opponentHpGraphic = `${this.opponentHp}%`
    }
  })

  this.battleSvc.opponentStamina$.subscribe(stamina => {
    this.opponentStamina = stamina
    if(this.opponentStamina) {
      this.opponentStaminaGraphic = `${this.opponentStamina}%`
    }
  })




}



}
