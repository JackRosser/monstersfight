import { Injectable } from '@angular/core';
import { iMonsters } from '../models/i-monsters';

@Injectable({
  providedIn: 'root'
})
export class GlobalfetchService {

  constructor() { }

url:string = "http://localhost:3000/monsters"

// ESEGUO UNA FETCH E MI ASPETTO UN ARRAY CON DENTRO OGGETTI DI TIPO iMonsters, quindi iMonsters[]
getAllMonsters():Promise<iMonsters[]> {
  return <Promise<iMonsters[]>> fetch(this.url).then(res => {
    if(!res) {
      throw new Error("ERRORE NELLA CHIAMATA")
    } return res.json()}).catch(err => {console.log("ERRORE" + err)})
}
// ESEGUO UNA FETCH E MI ASPETTO UN SINGOLO ELEMENTO DI TIPO iMonsters, quindi iMonsters
// IL MIO URL SARA' INDIRIZZO + ID DELLA SINGOLA CARD. IN QUESTO CASO NON MI INTERESSA OTTENERE TUTTO L'OGGETTO
//IL PARAMETRO CHE GLI PASSO E' UN SINGOLO ID
getSingleMonster(id:number):Promise<iMonsters> {
  return <Promise<iMonsters>> fetch(`${this.url}/${id}`).then(res => {
    if(!res) {
      throw new Error("ERRORE NELLA CHIAMATA")
    } return res.json()}).catch(err => {console.log("ERRORE" + err)})
}

// ESEGUO UNA FETCH E MI ASPETTO UN SINGOLO ELEMENTO dI tiPO iMonsters
// MA SICCOME UN ID NON ESISTE ANCORA E VIENE GENERATO DOPO NON POSSO METTERLO IO
// QUINDI DEVO PROMETTERGLI UN PARTIAL
createCard(newCard:Partial<iMonsters>):Promise<iMonsters> {
  return <Promise<iMonsters>> fetch(this.url, {
    method: "POST",
    headers: {
      "Content-type" : "application/json"
    },
    body: JSON.stringify(newCard)
  }).then(res => {
    if(!res) {
      throw new Error("ERRORE NELLA CHIAMATA")
    } return res.json()}).catch(err => {console.log("ERRORE" + err)})
}

// ESEGUO UNA FETCH PER MODIFICARE UNA CARD
//IN QUESTO CASO L'INDIRIZZO E' URL + CARD.ID COSI MI RESTITUISCE TUTTA LA CARD CHE MI INTERESSA
editCard(card:iMonsters):Promise<iMonsters> {
  return <Promise<iMonsters>> fetch(`${this.url}/${card.id}`,{
    method: "PUT",
    headers: {
      "Content-type" : "application/json"
    },
    body: JSON.stringify(card)
  }).then(res => {
    if(!res) {
      throw new Error("ERRORE NELLA CHIAMATA")
    } return res.json()}).catch(err => {console.log("ERRORE" + err)})
}

deleteCard(id:number):Promise<iMonsters> {
  return <Promise<iMonsters>> fetch(`${this.url}/${id}`,{
    method: "DELETE"
  }).then(res => {
    if(!res) {
      throw new Error("ERRORE NELLA CHIAMATA")
    } return res.json()}).catch(err => {console.log("ERRORE" + err)})
}

}
