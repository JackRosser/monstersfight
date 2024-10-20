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
opponentHpBar!: string
opponentStaminaBar!: string


ngOnInit() {
  this.battleSvc.opponent$.subscribe(monster => {
    this.opponentMonster = monster[0]
    if(this.opponentMonster) {
    this.background = `url(${monster[0].sfondo})`
    this.opponentHpBar = `${monster[0].barraHp}%`
    this.opponentStaminaBar = `${monster[0].barraStamina}%`
    }
  })



}


}
