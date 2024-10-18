import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from './../../models/i-monsters';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monsterselect',
  templateUrl: './monsterselect.component.html',
  styleUrl: './monsterselect.component.scss'
})
export class MonsterselectComponent {

constructor(private chiamataAll:AllcardsService) {}

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
  this.chiamataAll.allCards$.subscribe(cards => {
    if (cards.length > 0) {
      this.monstersList = cards;
      this.monsterBg = `background-image: url(${this.monstersList[0].img})`;
      this.mostroAttivo = this.monstersList[0];
    }
  });
}



}




