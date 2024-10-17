import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss'
})
export class ArenaComponent {

constructor(private chiamataDeck:DeckService,
  private chiamataAll:AllcardsService
) {}

deckSelezionato!:iMonsters[]
avversario!: iMonsters[]

ngOnInit() {

this.chiamataDeck.deck$.subscribe(deckGlobal => {
  this.deckSelezionato = deckGlobal
})

this.chiamataAll.allCards$.subscribe(cardsList => {
  this.avversario = cardsList

})

}

}
