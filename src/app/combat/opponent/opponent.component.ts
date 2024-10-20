import { Component, Input, SimpleChanges } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrl: './opponent.component.scss'
})
export class OpponentComponent {



// ANIMAZIONE
@Input() battleAnimationOppoent!: string
@Input() toggleAnimation!: boolean
@Input() opponentInGame!:iMonsters

background!:string
opponentHpBar!: string
opponentStaminaBar!: string
barraHpOpponent!:string
barraStaminaOpponent!:string

ngOnInit() {
  if(this.opponentInGame) {
    this.background = `url(${this.opponentInGame.sfondo})`
    this.barraHpOpponent = `${this.opponentInGame.barraHp}%`
    this.barraStaminaOpponent = `${this.opponentInGame.barraStamina}%`
  }

 }


}
