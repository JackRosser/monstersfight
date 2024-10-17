import { iMonsters } from './../models/i-monsters';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private chiamata: HttpClient) {}

  deckUrl: string = "http://localhost:3000/deck";

  deckService!: iMonsters[]

getDeck():Observable<iMonsters[]> {
return this.chiamata.get<iMonsters[]>(this.deckUrl)
}

removeDeck(id:number) {
return this.chiamata.delete<iMonsters>(`${this.deckUrl}/${id}`)
}



}





