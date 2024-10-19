import { iBattle } from './../models/battle';
import { iMonsters } from './../models/i-monsters';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private battleUrl = 'http://localhost:3000/battle';

  constructor(private http:HttpClient) {
this.getPlayerStatistic(), this.getOpponentStatistic()
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

// HP E STAMINA PLAYER

startStatistic: iBattle = {
  id: 0,
  hp: 0,
  stamina: 0
}

private playerStatistics = new BehaviorSubject<iBattle>(this.startStatistic)
playerStatistics$ = this.playerStatistics.asObservable()


updateHpPlayer(update:number):void {

// RECUPERO I DATI ATTUALI DEL BEHAVIOR
const currentStats:iBattle = this.playerStatistics.getValue()
// CREO UN CLONE IN CUI MOdIficO SOLO IL VALORE CHE MI SERVE
const updateHp:iBattle = {...currentStats, hp: update}
// UPDATO IL CLONE
this.playerStatistics.next(updateHp)

}

updateStaminaPlayer(update:number):void {

  const currentStats:iBattle = this.playerStatistics.getValue()
  const updateHp:iBattle = {...currentStats, stamina: update}
  this.playerStatistics.next(updateHp)

  }


// HP E STAMINA OPPONENT

private opponentStatistics = new BehaviorSubject<iBattle>(this.startStatistic)
opponentStatistics$ = this.opponentStatistics.asObservable()


updateHpOpponent(update:number):void {

  const currentStats:iBattle = this.opponentStatistics.getValue()
  const updateHp:iBattle = {...currentStats, stamina: update}
  this.playerStatistics.next(updateHp)

  }

  updateStaminaOpponent(update:number):void {

    const currentStats:iBattle = this.opponentStatistics.getValue()
    const updateHp:iBattle = {...currentStats, stamina: update}
    this.playerStatistics.next(updateHp)

    }

// PARTE CHE SI RIFERISCE AL SERVER
// QUI CARICO IL MIO OGGETTO

private getPlayerStatistic() {
  this.http.get<iBattle[]>(this.battleUrl).subscribe(dati => {
this.playerStatistics.next(dati[0])
  })
}

private getOpponentStatistic() {
  this.http.get<iBattle[]>(this.battleUrl).subscribe(dati => {
this.opponentStatistics.next(dati[1])
  })
}

// QUI ESEGUO L'UPDATE

updatePlayer(objModified:iBattle) {
this.http.put<Partial<iBattle>>(`${this.battleUrl}/${objModified.id}`, objModified)
}

updateOpponent(objModified:iBattle) {
  this.http.put<Partial<iBattle>>(`${this.battleUrl}/${objModified.id}`, objModified)
  }

}
