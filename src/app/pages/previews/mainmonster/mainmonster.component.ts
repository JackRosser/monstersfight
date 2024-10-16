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
@Input() monsterBg!: any
@Input() monsterListActive!:any

monstersList!: iMonsters[]

ngOnInit() {
  this.cardsList.allCards$.subscribe(list => {
    this.monstersList = list
  })
}

}
