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

@Input() monsterHover!: (monster: iMonsters) => void
@Input() borderActive!: string

monstersList!: iMonsters[]

ngOnInit() {

this.list.allCards$.subscribe(cardlist => {
this.monstersList = cardlist

})

}


}
