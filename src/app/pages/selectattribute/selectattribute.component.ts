import { iMonsters } from './../../models/i-monsters';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllcardsService } from '../../services/allcards.service';

@Component({
  selector: 'app-selectattribute',
  templateUrl: './selectattribute.component.html',
  styleUrl: './selectattribute.component.scss'
})
export class SelectattributeComponent {


constructor(private chiamataAll:AllcardsService) {}

monstersList!: iMonsters[]
icons: string[] = ["services/icons/acqua.webp", "services/icons/fuoco.webp", "services/icons/vento.webp", "services/icons/terra.webp", "services/icons/erba.webp", "services/icons/legendary.webp"]
iconClass: string = "max-h-[4rem] rounded-full cursor-pointer hover:scale-110 hover:rotate-[20deg] transition-transform duration-[300ms] active:scale-50"

@Output() iconaScelta = new EventEmitter<string>()
@Output() iconaTotale = new EventEmitter<iMonsters[]>()


iconaCliccata!: string

showMyActribute(icona:string) {
this.iconaCliccata = icona
this.iconaScelta.emit(this.iconaCliccata)
}

allCardsIcon() {
  this.iconaTotale.emit(this.monstersList)
}


ngOnInit() {
  this.chiamataAll.allCards$.subscribe(list => {
    this.monstersList = list
  })
}



}
