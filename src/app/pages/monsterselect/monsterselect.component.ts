import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from './../../models/i-monsters';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monsterselect',
  templateUrl: './monsterselect.component.html',
  styleUrl: './monsterselect.component.scss'
})
export class MonsterselectComponent {



constructor(private list:AllcardsService) {}


monstersList!: iMonsters[]
monsterListActive!: iMonsters
monsterBg!: string
borderActive: string = ""

ngOnInit() {
  this.list.allCards$.subscribe(cards => {
    this.monstersList = cards
  })
}
// monsterHover(monster: iMonsters): void {
// this.monsterListActive = monster
// this.monsterBg = `background-image: url(${this.monsterListActive.img})`

}




