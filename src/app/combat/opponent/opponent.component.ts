import { Component, Input, SimpleChanges } from '@angular/core';
import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrl: './opponent.component.scss'
})
export class OpponentComponent {


  monsterActive!: iMonsters
  background:string = ""
  hpCounter: number = 100
  hp:string = `width: ${this.hpCounter}%`
  staminaCounter: number = 100
  stamina:string = `width: ${this.staminaCounter}%`

// ANIMAZIONE
@Input() battleAnimationOppoent!: string
@Input() toggleAnimation!: boolean
@Input() opponentCards!: iMonsters[]
@Input() opponentHp!: string
@Input() opponentStamina!: string



ngOnChanges(changes: SimpleChanges) {

  if (changes['opponentCards'] && this.opponentCards.length > 0) {
    let randomIndex:number = Math.floor(Math.random() * this.opponentCards.length)
    this.monsterActive = this.opponentCards[randomIndex];
    this.background = `url(${this.monsterActive.sfondo})`;
  }
}



}
