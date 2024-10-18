import { iMonsters } from './../models/i-monsters';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private chiamata: HttpClient) {
    this.getDeck()
  }

  deckUrl: string = "http://localhost:3000/deck";


  deck$ = new BehaviorSubject<iMonsters[]>([])
  deckService: iMonsters[] = []

private getDeck() {
this.chiamata.get<iMonsters[]>(this.deckUrl).subscribe(deckJSON => {
  this.deckService = deckJSON
  this.deck$.next(deckJSON)
})
}

removeDeck(id:number) {
  this.chiamata.delete<iMonsters>(`${this.deckUrl}/${id}`).pipe(tap(() => {
  this.deckService = this.deckService.filter(card => card.id !== id)
  this.deck$.next(this.deckService)
})).subscribe()
}

addCard(card:Partial<iMonsters>) {
  this.chiamata.post<iMonsters>(this.deckUrl, card).pipe(tap(card => {
  this.deckService.push(card)
  this.deck$.next(this.deckService)
 })).subscribe()
}



}





