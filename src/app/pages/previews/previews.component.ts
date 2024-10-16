import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrl: './previews.component.scss'
})
export class PreviewsComponent {

@Input() monstersList!: iMonsters[];
@Input() monsterHover!: (monster: iMonsters) => void
@Input() borderActive!: string
@Input() cardInDeck!: iMonsters

@Output() listaModificata = new EventEmitter<iMonsters[]>()


monsterFilter!: iMonsters[]

changeMonsterFilter(elemento:string) {
  this.monsterFilter = this.monstersList.filter(card => card.icon === elemento)
  this.listaModificata.emit(this.monsterFilter)

}

}
