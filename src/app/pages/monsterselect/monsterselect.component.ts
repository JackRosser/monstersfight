import { GlobalfetchService } from '../../services/globalfetch.service';
import { iMonsters } from './../../models/i-monsters';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monsterselect',
  templateUrl: './monsterselect.component.html',
  styleUrl: './monsterselect.component.scss'
})
export class MonsterselectComponent {


//QUI RICHIAMO IL SERVICE A CUI FACCIO RIFERIMENTO PER GLI OBSERVABLES
// myJson è il nome con cui mi riferisco al mio documento che contiene tutte le carte

constructor(private myJson:GlobalfetchService) {}


// // QUI RICHIAMO LA CRUD DENTRO A GLOBAL FETCH SERVICE
//   constructor(private globalFetch:GlobalfetchService) {

// }

monstersList!: iMonsters[]
monsterListActive!: iMonsters
monsterBg!: string
borderActive: string = ""

monsterHover(monster: iMonsters): void {
this.monsterListActive = monster
this.monsterBg = `background-image: url(${this.monsterListActive.img})`

}

ngOnInit() {
  this.myJson.getAllCards().subscribe(allMonsters => {
    this.monstersList = allMonsters.sort((a, b) => {
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


}
