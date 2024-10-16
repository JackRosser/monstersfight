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

cardInDeck(monster: iMonsters) {
  this.deck.addCardToDeck(monster).subscribe({
    next: (response) => {
      console.log('Carta aggiunta con successo', response); // Successo
    },
    error: (error) => {
      alert("Errore: " + error.message); // Gestione dell'errore
    }
  });
}




ngOnInit() {

this.list.allCards$.subscribe(cardlist => {
this.monstersList = cardlist

})

}


}

