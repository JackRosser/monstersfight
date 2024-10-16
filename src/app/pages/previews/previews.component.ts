import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';
import { AllcardsService } from '../../services/allcards.service';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrl: './previews.component.scss'
})
export class PreviewsComponent {

constructor(private list:AllcardsService) {}

monstersList!: iMonsters[]
bgCheCambia!: string
@Output() nuovoBg = new EventEmitter<string>()

monsterHover(monster:iMonsters) {
this.bgCheCambia = monster.img
this.nuovoBg.emit(this.bgCheCambia)

}

ngOnInit() {

this.list.allCards$.subscribe(cardlist => {
this.monstersList = cardlist

})

}


}
// monsterHover(monster: iMonsters): void {
//   this.monsterActive = monster
//   this.monsterBg = `background-image: url(${this.monsterActive.img})`
// }
