import { iMonsters } from './../models/i-monsters';
import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { AllcardsService } from './allcards.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() { }

private playerCard = new Subject<iMonsters>()
player$ = this.playerCard.asObservable()

private opponentCard = new Subject<iMonsters>()
opponent$ = this.opponentCard.asObservable()

sendPlayerCards(card:iMonsters) {
this.playerCard.next(card)
}

sendOpponentCards(card:iMonsters) {
this.opponentCard.next(card)
}




}
