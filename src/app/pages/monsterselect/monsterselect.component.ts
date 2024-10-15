import { GlobalfetchService } from '../../services/globalfetch.service';
import { iMonsters } from './../../models/i-monsters';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monsterselect',
  templateUrl: './monsterselect.component.html',
  styleUrl: './monsterselect.component.scss'
})
export class MonsterselectComponent {


// QUI RICHIAMO LA CRUD DENTRO A GLOBAL FETCH SERVICE
  constructor(private globalFetch:GlobalfetchService) {

}

// AUDIO
// musicMenu: string = "public/services/musics/MenuMusic.mp3"

monstersList!: iMonsters[]
monsterListActive!: iMonsters
monsterBg!: any
borderActive: string = ""

monsterHover(monster: iMonsters): void {
this.monsterListActive = monster
this.monsterBg = `background-image: url(${this.monsterListActive.img})`

}

activeBorder(): void {
this.borderActive = "border: 2px solid yellow"
}

// CREO UNA FUNZIONE ANDANDOMI A PRENDERE IL METODO DEFINITO IN GLOBAL FETCH SERVICE
showAllCards() {
  this.globalFetch.getAllMonsters().then((data:iMonsters[]) => {
    // GENERAZIONE DELLA LISTA DEI MOSTRI IN ORDINE ALFABETICO

    this.monstersList = data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    if(this.monstersList) {
this.monsterListActive = this.monstersList[0]
 }
 if(this.monsterListActive) {
this.monsterBg = `background-image: url(${this.monsterListActive.img})`
 }

  })
}





ngOnInit() {
  this.showAllCards()
}


}
