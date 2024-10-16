import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iMonsters } from './../models/i-monsters';
import { GlobalfetchService } from './globalfetch.service';

@Injectable({
  providedIn: 'root'
})
export class AllcardsService {

  constructor(private myJson: GlobalfetchService) {
    this.loadAllCards(); // CARICO LE CARDS
  }

// MI CREO UN ARRAY VUOTO
  private allCardsSubject = new BehaviorSubject<iMonsters[]>([]);
  public allCards$: Observable<iMonsters[]> = this.allCardsSubject.asObservable();

// METTO LE CARDS NELL'ARRAY
  private loadAllCards() {
    this.myJson.getAllCards().subscribe((allMonsters: iMonsters[]) => {
      const sortedMonsters = allMonsters.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.allCardsSubject.next(sortedMonsters);
    });
  }



}
