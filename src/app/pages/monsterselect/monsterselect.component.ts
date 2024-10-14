import { iMonsters } from './../../models/i-monsters';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monsterselect',
  templateUrl: './monsterselect.component.html',
  styleUrl: './monsterselect.component.scss'
})
export class MonsterselectComponent {



// AUDIO
// musicMenu: string = "public/services/musics/MenuMusic.mp3"

monstersList!: iMonsters[]
monsterListActive!: iMonsters
monsterBg!: any

monsterHover(monster: iMonsters): void {
this.monsterListActive = monster
this.monsterBg = `background-image: url(${this.monsterListActive.img})`

}

ngOnInit() {



  fetch("monsters.json").then(res => {
    if (!res.ok) {
      throw new Error("Errore nella chiamata")
    }
    return res.json()
  }).then((data:iMonsters[]) => {
    this.monstersList = data
    if(this.monstersList) {
this.monsterListActive = this.monstersList[0]
 }
 if(this.monsterListActive) {
this.monsterBg = `background-image: url(${this.monsterListActive.img})`
 }

  }).catch(err => {
    console.log("ERRORE:", err);

  })




}




}
