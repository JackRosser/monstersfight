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


// ASPETTO CHE MOSTROATTIVO CI SIA PRIMA di CAMBIARE MONSTERACTIVE

monstersList!: iMonsters[]
monsterActive: iMonsters = {
  id: 0,
  name: '',
  type: '',
  description: '',
  principale: '',
  debolezza: '',
  hp: 0,
  atk: 0,
  def: 0,
  speed: 0,
  stamina: 0,
  img: '',
  icon: '',
  locked: false,
  indeck: false,
  sfondo: '',
  minore: '',
  barraHp: 0,
  barraStamina: 0,
  forza: ''
}

@Input() set mostroAttivo(value: iMonsters | null) {
  if (value) {
    this.monsterActive = value;
  }
}

ngOnInit() {
  this.cardsList.allCards$.subscribe(list => {
    this.monstersList = list;
    if (this.monstersList.length > 0) {
      this.monsterActive = this.monstersList[0];
    }
  });
}


}
