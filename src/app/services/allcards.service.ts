import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iMonsters } from './../models/i-monsters';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AllcardsService {

constructor(private chiamata:HttpClient) {
  this.getAllCards()
}

cardsUrl:string = "http://localhost:3000/monsters"


allCards$ = new BehaviorSubject<iMonsters[]>([])
allCardsContainer: iMonsters[] = []


private getAllCards() {

this.chiamata.get<iMonsters[]>(this.cardsUrl).subscribe(allCardsJSON => {
  this.allCardsContainer = allCardsJSON
  this.allCards$.next(this.allCardsContainer)
})}



insertNewCard(card:Partial<iMonsters>) {
  this.chiamata.post<iMonsters>(this.cardsUrl, card).pipe(tap(c => {
    this.allCardsContainer.push(c)
    this.allCards$.next(this.allCardsContainer)
  })).subscribe()
}

deteleCard(id:number) {
this.chiamata.delete<iMonsters>(`${this.cardsUrl}/${id}`).pipe(tap(() => {
  this.allCardsContainer.filter(card => card.id !== id)
  this.allCards$.next(this.allCardsContainer)
})).subscribe()
}

modifyCard(card: Partial<iMonsters>) {
  if (!card.id) return; // Controllo che la card abbia un ID

  this.chiamata.put<iMonsters>(`${this.cardsUrl}/${card.id}`, card).pipe(
    tap((updatedCard) => {
      // Trova l'indice della carta da modificare
      const index = this.allCardsContainer.findIndex(c => c.id === updatedCard.id);
      if (index !== -1) {
        // Aggiorna la carta nell'array
        this.allCardsContainer[index] = updatedCard;
        this.allCards$.next(this.allCardsContainer);
      }
    })
  ).subscribe();
}






}




