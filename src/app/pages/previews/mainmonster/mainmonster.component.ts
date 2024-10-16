import { iMonsters } from './../../../models/i-monsters';
import { Component, input, Input } from '@angular/core';
import { AllcardsService } from '../../../services/allcards.service';

@Component({
  selector: 'app-mainmonster',
  templateUrl: './mainmonster.component.html',
  styleUrl: './mainmonster.component.scss'
})
export class MainmonsterComponent {

constructor(private cardsList:AllcardsService) {}

@Input() set mostroAttivo(value: iMonsters) {
  if (value) {
    this.monsterActive = value;
  }
}


monstersList!: iMonsters[]
monsterActive!: iMonsters

ngOnInit() {
  this.cardsList.allCards$.subscribe(list => {
    this.monstersList = list
    this.monsterActive = this.monstersList[0]

  })
}

}
