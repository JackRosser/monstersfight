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

reduceHpPlayer(value:number) {
  this.playerHp.next(value)
  this.updateBattleData();
}

private playerStamina = new BehaviorSubject<number>(100)
playerStamina$ = this.playerStamina.asObservable()

reduceStaminaPlayer(value:number) {
  this.playerStamina.next(value)
  this.updateBattleData();
}

private opponentHp = new BehaviorSubject<number>(100)
opponentHp$ = this.opponentHp.asObservable()

reduceHpOpponent(value:number) {
  this.opponentHp.next(value)
  this.updateBattleData();
}

private opponentStamina = new BehaviorSubject<number>(100)
opponentStamina$ = this.opponentStamina.asObservable()

reduceStaminaOpponent(value:number) {
  this.opponentStamina.next(value)
  this.updateBattleData();
}

private loadBattleData() {
  this.http.get<iBattle>(this.apiUrl)
    .subscribe(data => {
      this.playerHp.next(data.playerHp);
      this.playerStamina.next(data.playerStamina);
      this.opponentHp.next(data.opponentHp);
      this.opponentStamina.next(data.opponentStamina);
    });
}

private updateBattleData() {
  const battleData: iBattle = {
    playerHp: this.playerHp.getValue(),
    playerStamina: this.playerStamina.getValue(),
    opponentHp: this.opponentHp.getValue(),
    opponentStamina: this.opponentStamina.getValue(),
  };

  this.http.put(this.apiUrl, battleData)
  .subscribe()
}


}
