import { Injectable } from "@angular/core";
import { iMonsters } from "../models/i-monsters";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private playerUrl = 'http://localhost:3000/deckPlayer';
  private opponentUrl = 'http://localhost:3000/deckOpponent';

  playerInGame = new BehaviorSubject<iMonsters[]>([]);
  player$ = this.playerInGame.asObservable();

  opponentInGame = new BehaviorSubject<iMonsters[]>([]);
  opponent$ = this.opponentInGame.asObservable();

  constructor(private callPlayer: HttpClient, private callOpponent: HttpClient) {
    this.getPlayerDeck();
    this.getOpponentDeck();
  }

  // Ottieni il deck del player
  getPlayerDeck(): void {
    this.callPlayer.get<iMonsters[]>(this.playerUrl).subscribe(playerDeck => {
      this.playerInGame.next(playerDeck);
    });
  }

  // Ottieni il deck dell'opponent
  getOpponentDeck(): void {
    this.callOpponent.get<iMonsters[]>(this.opponentUrl).subscribe(opponentDeck => {
      this.opponentInGame.next(opponentDeck);
    });
  }


  // Funzione per caricare i deck a inizio battaglia
  // La uso anche per ripristinare i deck dopo una battaglia
  resetDeck(): void {
    this.getPlayerDeck();
    this.getOpponentDeck();
  }

}
