import { iMonsters } from './../models/i-monsters';
import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { AllcardsService } from './allcards.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { iBattle } from '../models/battle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private apiUrl = 'http://localhost:3000/battle';

  constructor(private http:HttpClient) {
    this.loadBattleData();
  }

startObject: iMonsters = {
  id: 0,
  name: '',
  type: '',
  description: '',
  principale: '',
  debolezza: '',
  hp: 0,
  atk: 0,
  def: 0,
  speed: 0,
  stamina: 0,
  img: '',
  icon: '',
  locked: false,
  indeck: false,
  sfondo: ''
}

private playerCard = new BehaviorSubject<iMonsters>(this.startObject)
player$ = this.playerCard.asObservable()

private opponentCard = new BehaviorSubject<iMonsters>(this.startObject)
opponent$ = this.opponentCard.asObservable()

sendPlayerCards(card:iMonsters) {
this.playerCard.next(card)
}

sendOpponentCards(card:iMonsters) {
this.opponentCard.next(card)
}

private playerHp = new BehaviorSubject<number>(100)
playerHp$ = this.playerHp.asObservable()

reduceHpPlayer(value:number, statisticheAggiornate:iBattle) {
  this.playerHp.next(value)
  this.updateBattleData(statisticheAggiornate);
}

private playerStamina = new BehaviorSubject<number>(100)
playerStamina$ = this.playerStamina.asObservable()

reduceStaminaPlayer(value:number, statisticheAggiornate:iBattle) {
  this.playerStamina.next(value)
  this.updateBattleData(statisticheAggiornate);
}

private opponentHp = new BehaviorSubject<number>(100)
opponentHp$ = this.opponentHp.asObservable()

reduceHpOpponent(value:number, statisticheAggiornate:iBattle) {
  this.opponentHp.next(value)
  this.updateBattleData(statisticheAggiornate);
}

private opponentStamina = new BehaviorSubject<number>(100)
opponentStamina$ = this.opponentStamina.asObservable()

reduceStaminaOpponent(value:number, statisticheAggiornate:iBattle) {
  this.opponentStamina.next(value)
  this.updateBattleData(statisticheAggiornate);
}

// PARTE IN CUI CARICO I DATI NEL SERVER

private loadBattleData() {
  this.http.get<iBattle[]>(this.apiUrl)
    .subscribe(data => {
      if (data && data.length > 0) {
        const battle = data[0];
        this.playerHp.next(battle.playerHp);
        this.playerStamina.next(battle.playerStamina);
        this.opponentHp.next(battle.opponentHp);
        this.opponentStamina.next(battle.opponentStamina);
      }
    });
}

private updateBattleData(statistiche:iBattle) {
this.http.put<iBattle>(`${this.apiUrl}/${statistiche.id}`, statistiche).subscribe()
}




}
