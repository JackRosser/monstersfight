import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iMonsters } from '../models/i-monsters';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private chiamata: HttpClient) {}

  deckUrl: string = "http://localhost:3000/deck";

  private deckSubject = new BehaviorSubject<iMonsters[]>([]);
  public cardsInDeck$: Observable<iMonsters[]> = this.deckSubject.asObservable();

  public loadDeck() {
    this.chiamata.get<iMonsters[]>(this.deckUrl).subscribe((deck: iMonsters[]) => {
      this.deckSubject.next(deck);  // Aggiorna il BehaviorSubject con i dati
    });
  }

  cardsInDeck(): Observable<iMonsters[]> {
    return this.cardsInDeck$;
  }

  deleteCardInDeck(id: number): Observable<iMonsters> {
    return this.chiamata.delete<iMonsters>(`${this.deckUrl}/${id}`).pipe(
      tap(() => {
        const updatedDeck = this.deckSubject.getValue().filter(card => card.id !== id);
        this.deckSubject.next(updatedDeck);
      })
    );
  }

  addCardToDeck(newCard: iMonsters): Observable<iMonsters> {
    const currentDeck = this.deckSubject.getValue();

    // Controlla se il deck ha già 6 carte
    if (currentDeck.length >= 6) {
      return new Observable(observer => {
        observer.error('Il deck può contenere al massimo 6 carte.');
      });
    }

    // Controlla se la carta è già presente nel deck
    const cardExists = currentDeck.some(card => card.id === newCard.id);
    if (cardExists) {
      return new Observable(observer => {
        observer.error('La carta è già presente nel deck.');
      });
    }

    return this.chiamata.post<iMonsters>(this.deckUrl, newCard).pipe(
      tap((addedCard: iMonsters) => {
        const updatedDeck = [...currentDeck, addedCard];  // Aggiungi la nuova carta all'array esistente
        this.deckSubject.next(updatedDeck);  // Aggiorna il BehaviorSubject con la nuova carta
      })
    );
  }




}
