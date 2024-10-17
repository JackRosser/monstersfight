import { Component, Input } from '@angular/core';
import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrl: './opponent.component.scss'
})
export class OpponentComponent {

  constructor(private chiamataAll:AllcardsService) {}

  opponentCards: iMonsters[] = []

  monsterActive!: iMonsters
  background:string = ""
  hpCounter: number = 100
  hp:string = `width: ${this.hpCounter}%`
  staminaCounter: number = 100
  stamina:string = `width: ${this.staminaCounter}%`

// ANIMAZIONE
@Input() battleAnimationOppoent!: string
@Input() toggleAnimation!: boolean








  ngOnInit() {

    this.chiamataAll.allCards$.subscribe(allCards => {
    let randomIndex:number = Math.floor(Math.random() * allCards.length)
    this.opponentCards = allCards
    this.monsterActive = this.opponentCards[randomIndex]
    this.background = `url(${this.monsterActive.sfondo})`

  })
  }


}
