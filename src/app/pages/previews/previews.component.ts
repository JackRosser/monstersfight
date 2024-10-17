import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';
import { AllcardsService } from '../../services/allcards.service';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrl: './previews.component.scss'
})
export class PreviewsComponent {

constructor(private list:AllcardsService,
  private deck:DeckService) {}

monstersList!: iMonsters[]
bgCheCambia!: string
mostroAttivo: iMonsters = {} as iMonsters
@Output() nuovoBg = new EventEmitter<string>()
@Output() mostroVisualizzato = new EventEmitter<iMonsters>()

monsterHover(monster: iMonsters) {
  if (monster) {  // Aggiungi un controllo
    this.bgCheCambia = monster.img;
    this.mostroAttivo = monster;
    this.nuovoBg.emit(this.bgCheCambia);
    this.mostroVisualizzato.emit(this.mostroAttivo);
  }
}

newCard!: iMonsters

//GESTIONE TOGGLE

alertMostrato: string = "absolute bg-black p-5 w-2/3 md:w-1/4 lg:top-[5rem] text-white rounded-[10px] z-50 flex flex-col items-center gap-5 border shadow-sm";

myDeck!: iMonsters[]
alertToggle:boolean = false

cardInDeck() {
this.alertToggle = !this.alertToggle
}

addCardInDeck(card:iMonsters) {
  if(this.myDeck.length < 6) {
  this.myDeck.push(card)}
  else {
    this.alertToggle = !this.alertToggle
  }
}

closeAlert() {

}

ngOnInit() {

// VISUALIZZO TUTTE LE CARTE
this.list.allCards$.subscribe(cardlist => {
this.monstersList = cardlist
// VISUALIZZO LE CARTE DEL DECK
this.deck.getDeck().subscribe(deckOttenuto => {
this.myDeck = deckOttenuto
})
this.deck.deckService = this.myDeck
})

}


}

