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

  // Aggiorna gli HP del player nel deck
  updateHpPlayer(damage: number): void {
    const currentPlayerDeck = this.playerInGame.getValue();
    currentPlayerDeck[0].hp -= damage;
    this.playerInGame.next([...currentPlayerDeck]);
    this.updateCardPlayer(currentPlayerDeck[0]);
    this.removePlayerFromActiveDeck(currentPlayerDeck[0].id); // Verifica se rimuovere
  }

  // Aggiorna gli HP dell'opponent nel deck
  updateHpOpponent(damage: number): void {
    const currentOpponentDeck = this.opponentInGame.getValue();
    currentOpponentDeck[0].hp -= damage;
    this.opponentInGame.next([...currentOpponentDeck]);
    this.updateCardOpponent(currentOpponentDeck[0]);
    this.removeOpponentFromActiveDeck(currentOpponentDeck[0].id); // Verifica se rimuovere
  }

  // Rimuovi il mostro del player dal deck attivo se gli HP sono 0
  removePlayerFromActiveDeck(id: number): void {
    const currentPlayerDeck = this.playerInGame.getValue().filter(card => card.hp > 0);
    this.playerInGame.next(currentPlayerDeck);
    if (currentPlayerDeck.length === 0) {
      // Logica per la fine della partita per il player
      console.log('Player has no more monsters, game over!');
    }
  }

  // Rimuovi il mostro dell'opponent dal deck attivo se gli HP sono 0
  removeOpponentFromActiveDeck(id: number): void {
    const currentOpponentDeck = this.opponentInGame.getValue().filter(card => card.hp > 0);
    this.opponentInGame.next(currentOpponentDeck);
    if (currentOpponentDeck.length === 0) {
      // Logica per la fine della partita per l'opponent
      console.log('Opponent has no more monsters, you win!');
    }
  }

  // Ripristina il deck al termine della battaglia
  resetDeck(): void {
    this.getPlayerDeck(); // Ripristina il deck del player
    this.getOpponentDeck(); // Crea un nuovo deck per l'opponent
  }

  // Aggiorna la carta del player nel server
  updateCardPlayer(card: iMonsters): void {
    this.callPlayer.put<iMonsters>(`${this.playerUrl}/${card.id}`, card).subscribe({
      next: (updatedCard: iMonsters) => {
        const currentPlayerDeck = this.playerInGame.getValue();
        const index = currentPlayerDeck.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          currentPlayerDeck[index] = updatedCard;
        }
        this.playerInGame.next([...currentPlayerDeck]);
      }
    });
  }

  // Aggiorna la carta dell'opponent nel server
  updateCardOpponent(card: iMonsters): void {
    this.callOpponent.put<iMonsters>(`${this.opponentUrl}/${card.id}`, card).subscribe({
      next: (updatedCard: iMonsters) => {
        const currentOpponentDeck = this.opponentInGame.getValue();
        const index = currentOpponentDeck.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          currentOpponentDeck[index] = updatedCard;
        }
        this.opponentInGame.next([...currentOpponentDeck]);
      }
    });
  }
}
