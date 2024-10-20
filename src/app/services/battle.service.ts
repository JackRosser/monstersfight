import { iMonsters } from './../models/i-monsters';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private playerUrl = 'http://localhost:3000/deckPlayer';
  private opponentUrl = 'http://localhost:3000/deckOpponent';

  constructor(private callPlayer:HttpClient, private callOpponent:HttpClient) {
    this.getPlayerDeck()
  }

// FACCIO UNA CHIAMATA A DECK GIOCATORE E DECK OPPONENT E COSI' OTTENGO I DATI DEGLI ELEMENTI IN GIOCO
// UN BEHAVIOR PER IL PLAYER, UN BEHAVIOR PER L'OPPONENT
// IL PRIMO MOSTRO VISUALIZZATO SARA' INDEX[0]
// CREO DELLE FUNZIONI CHE AGGIORNINO IL BEHAVIOR DEL PLAYER E IL BEHAVIOR DELL'OPPONENT
// IN QUESTE FUNZIONI SI AGGIORNERA' IL BEHAVIOR E IL SERVER

// PARTE DEL PLAYER

playerInGame = new BehaviorSubject<iMonsters[]>([])
player$ = this.playerInGame.asObservable()


getPlayerDeck():void {
this.callPlayer.get<iMonsters[]>(this.playerUrl).subscribe(playerDeck => {
  this.playerInGame.next(playerDeck)
})
}

updateCardPlayer(card: iMonsters): void {
  this.callPlayer.put<iMonsters>(`${this.playerUrl}/${card.id}`, card).subscribe({
    next: (cardModify: iMonsters) => {
      const currentPlayerDeck = this.playerInGame.getValue();
      const index = currentPlayerDeck.findIndex(c => c.id === cardModify.id);
      if (index !== -1) {
        currentPlayerDeck[index] = cardModify;
      }
      this.playerInGame.next([...currentPlayerDeck]);
    }
  });
}

// PARTE DELL'OPPONENT

opponentInGame = new BehaviorSubject<iMonsters[]>([])
Opponent$ = this.opponentInGame.asObservable()


getOpponentDeck():void {
this.callOpponent.get<iMonsters[]>(this.opponentUrl).subscribe(OpponentDeck => {
  this.opponentInGame.next(OpponentDeck)
})
}

updateCardOpponent(card: iMonsters): void {
  this.callOpponent.put<iMonsters>(`${this.opponentUrl}/${card.id}`, card).subscribe({
    next: (cardModify: iMonsters) => {
      const currentOpponentDeck = this.opponentInGame.getValue();
      const index = currentOpponentDeck.findIndex(c => c.id === cardModify.id);
      if (index !== -1) {
        currentOpponentDeck[index] = cardModify;
      }
      this.opponentInGame.next([...currentOpponentDeck]);
    }
  });
}

}
