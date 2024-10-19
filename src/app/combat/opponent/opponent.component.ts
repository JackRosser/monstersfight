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

  this.battleSvc.playerStatistics$.subscribe(statistics => {
    this.opponentHp = statistics.hp
    this.opponentStamina = statistics.stamina
    if(this.opponentHp && this.opponentStamina) {
  this.opponentHpGraphic = `${this.opponentHp}%`
  this.opponentStaminaGraphic = `${this.opponentStamina}%`
    }
   })



}



}
