import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iMonsters } from './../models/i-monsters';
import { GlobalfetchService } from './globalfetch.service';

@Injectable({
  providedIn: 'root'
})
export class AllcardsService {

  // Creiamo un BehaviorSubject che inizialmente è vuoto (con un array vuoto)
  private allCardsSubject = new BehaviorSubject<iMonsters[]>([]);
  public allCards$: Observable<iMonsters[]> = this.allCardsSubject.asObservable();

  constructor(private myJson: GlobalfetchService) {
    this.loadAllCards(); // Carica tutte le carte all'inizio
  }

  // Metodo per caricare tutte le carte
  private loadAllCards() {
    this.myJson.getAllCards().subscribe((allMonsters: iMonsters[]) => {
      const sortedMonsters = allMonsters.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.allCardsSubject.next(sortedMonsters); // Emettiamo i dati attraverso il BehaviorSubject
    });
  }
}
