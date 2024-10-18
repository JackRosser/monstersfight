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
@Input() opponentHp!: number
@Input() opponentStamina!: number

opponentMonster!:iMonsters
background!:string
opponentHpGraphic:string = `${this.opponentHp}%`
opponentStaminaGraphic:string = `${this.opponentStamina}%`
opponentMonsterReceved:boolean = false


ngOnInit() {
  this.battleSvc.opponent$.subscribe(monster => {
    this.opponentMonster = monster
    this.background = `url(${monster.sfondo})`
    this.opponentMonsterReceved = true
  })
}



}
