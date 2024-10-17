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

constructor(private chiamataService:DeckService) {}

@Input() deckModal!: string // DENTRO A NAVBAR

myDeck!: iMonsters[]


deleteCard(id:number) {
  this.chiamataService.removeDeck(id)
}

ngOnInit() {
this.chiamataService.deck$.subscribe(deckGlobal => {
  this.myDeck = deckGlobal
})
}

  }



