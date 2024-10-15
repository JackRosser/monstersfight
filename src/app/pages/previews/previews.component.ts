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
@Input() inputDeck!: (card: iMonsters) => void

acqua:boolean = false
fuoco:boolean = false
vento:boolean = false
terra:boolean = false
erba:boolean = false
legendary:boolean = false
monstersFilter!: iMonsters[]

showImagesSelected(): void {
  if (this.acqua) {
    this.monstersFilter = this.monstersList.filter(type => type.type === "acqua");
  } else if (this.fuoco) {
    this.monstersFilter = this.monstersList.filter(type => type.type === "fuoco");
  } else if (this.vento) {
    this.monstersFilter = this.monstersList.filter(type => type.type === "vento");
  } else if (this.terra) {
    this.monstersFilter = this.monstersList.filter(type => type.type === "terra");
  } else if (this.erba) {
    this.monstersFilter = this.monstersList.filter(type => type.type === "erba");
  } else if (this.legendary) {
    this.monstersFilter = this.monstersList.filter(type => type.type === "legendary");
  }
}



}
