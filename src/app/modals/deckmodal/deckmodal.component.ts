import { DeckService } from '../../services/deck.service';
import { iMonsters } from './../../models/i-monsters';
import { GlobalfetchService } from './../../services/globalfetch.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deckmodal',
  templateUrl: './deckmodal.component.html',
  styleUrl: './deckmodal.component.scss'
})
export class DeckmodalComponent {

constructor(private decklist:DeckService) {}

@Input() deckModal!: string // DENTRO A NAVBAR

deck!: iMonsters[]

deleteCard(cardId:number) {
  this.decklist.deleteCardInDeck(cardId).subscribe()
}

ngOnInit() {
  this.decklist.loadDeck(); // MI aSSICURO CHE IL DECK SI CARICHI
  this.decklist.cardsInDeck$.subscribe(list => {
    this.deck = list;
  });
}


}
