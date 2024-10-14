import { iMonsters } from './../../models/i-monsters';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monsterselect',
  templateUrl: './monsterselect.component.html',
  styleUrl: './monsterselect.component.scss'
})
export class MonsterselectComponent {

// AUDIO
musicMenu: string = "public/services/musics/MenuMusic.mp3"

monstersList!: iMonsters[]
monsterPic!: string
backImage!: string

scorrimento(): void {

}

ngOnInit() {
  fetch("monsters.json").then(res => {
    if (!res.ok) {
      throw new Error("Errore nella chiamata")
    }
    return res.json()
  }).then((data:iMonsters[]) => {
    this.monstersList = data
    if(this.monstersList.length > 0) {
this.monsterPic = this.monstersList[0].img
this.backImage = `background-image: url(${this.monsterPic})`
    }



  }).catch(err => {
    console.log("ERRORE:", err);

  })

}

}
