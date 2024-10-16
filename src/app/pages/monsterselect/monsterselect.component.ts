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
monsterBg!: string
mostroAttivo!: iMonsters

inputBg(nuovoBg:string):void {
this.monsterBg = `background-image: url(${nuovoBg})`


}

mostroVisualizzato(mostro:iMonsters) {
  this.mostroAttivo = mostro

}

ngOnInit() {
  this.list.allCards$.subscribe(cards => {
    this.monstersList = cards
    this.monsterBg = `background-image: url(${this.monstersList[0].img})`


})
}


}




