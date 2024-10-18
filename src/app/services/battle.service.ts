import { iMonsters } from './../models/i-monsters';
import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { AllcardsService } from './allcards.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() {}

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
}

private playerStamina = new BehaviorSubject<number>(100)
playerStamina$ = this.playerStamina.asObservable()

reduceStaminaPlayer(value:number) {
  this.playerStamina.next(value)
}

private opponentHp = new BehaviorSubject<number>(100)
opponentHp$ = this.opponentHp.asObservable()

reduceHpOpponent(value:number) {
  this.opponentHp.next(value)
}

private opponentStamina = new BehaviorSubject<number>(100)
opponentStamina$ = this.opponentStamina.asObservable()

reduceStaminaOpponent(value:number) {
  this.opponentStamina.next(value)
}


}
