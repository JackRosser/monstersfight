import { HttpClient } from '@angular/common/http';
import { iMonsters } from './../models/i-monsters';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalfetchService {

  constructor(
    private http:HttpClient
  ) { }

url:string = "http://localhost:3000/monsters"

// FACCIO UNA RICHIESTA AL SERVER
// CON IL METODO GET CHE RITORNA UN ARRAY CON OGGETTI DI TIPO iMonsters
// getAllCards()||||||||||||:Observable<iMonsters[]>|||||||||||||| vuol dire che mi aspetto un risultato di tipo iMonsters[]
// quindi un array con dentro oggetti di tipo iMonsters
getAllCards():Observable<iMonsters[]> {
  return this.http.get<iMonsters[]>(this.url)
}

// FACCIO UNA RICHIESTA GET PER UN SOLO ID
// LA MIA FUNZIONE SI ASPETTA UN ID COME PARAMETRO CHE SARA'
// UN VALORE DI TIPO NUMBER
getCardId(id:number):Observable<iMonsters> {
return this.http.get<iMonsters>(`${this.url}/${id}`)
}
// FACCIO UNA RICHIESTA POST
// IL PARAMETRO CHE SI ASPETTA E' UN ELEMENTO DI TIPO IMONSTERS
// MA PARTIAL, PERCHE' NON GLI FORNISCO TUTTE LE INFORMAZIONI
// LUI IMMETTE NEL DATABASE UN OGGETTO DI TIPO IMONSTERS ALL'URL INDICATO
addCard(newCard:Partial<iMonsters>):Observable<iMonsters>{
  return this.http.post<iMonsters>(this.url, newCard)
}

//RICHIESTA PUT PER MODIFICARE UN ELEMENTO
// IL PARAMETRO SI APSETTA UN OGGETTO DI TIPO IMONSTERS
// L'URL VA A PESCARE URL+ID DEL MIO ELEMENTO E MODIFICA QUELLO. LA MODIFICA E' IL SECONDO PARAMETRO DI PUT, OSSIA CARD DEFINITA ALL'INIZIO
editCard(card:iMonsters):Observable<iMonsters> {
  return this.http.put<iMonsters>(`${this.url}/${card.id}`, card)
}

// RICHIESTA PER ELIMINARE UNA CARD CON IL METODO DELETE
//IL PARAMETRO SI APSETTA UN ID DI TIPO NUMBER
// RITORNERA' L'ELEMENTO ELIMINATO (QUALORA DOVESSE SERVIRE) CHE E' DI TIPO IMONSTERS
// L'URL E' FORMATO DALL'URL PRINCIPALE + QUELLO DELLA CARD CHE VOGLIO ELIMINARE

deleteCard(id:number):Observable<iMonsters> {
  return this.http.delete<iMonsters>(`${this.url}/${id}`)
}




// METODO VECCHIO DI FETCH PRIMA DI IMPARARE GLI OBSERVABLES

// // ESEGUO UNA FETCH E MI ASPETTO UN ARRAY CON DENTRO OGGETTI DI TIPO iMonsters, quindi iMonsters[]
// getAllMonsters():Promise<iMonsters[]> {
//   return <Promise<iMonsters[]>> fetch(this.url).then(res => {
//     if(!res) {
//       throw new Error("ERRORE NELLA CHIAMATA")
//     } return res.json()}).catch(err => {console.log("ERRORE" + err)})
// }
// // ESEGUO UNA FETCH E MI ASPETTO UN SINGOLO ELEMENTO DI TIPO iMonsters, quindi iMonsters
// // IL MIO URL SARA' INDIRIZZO + ID DELLA SINGOLA CARD. IN QUESTO CASO NON MI INTERESSA OTTENERE TUTTO L'OGGETTO
// //IL PARAMETRO CHE GLI PASSO E' UN SINGOLO ID
// getSingleMonster(id:number):Promise<iMonsters> {
//   return <Promise<iMonsters>> fetch(`${this.url}/${id}`).then(res => {
//     if(!res) {
//       throw new Error("ERRORE NELLA CHIAMATA")
//     } return res.json()}).catch(err => {console.log("ERRORE" + err)})
// }

// // ESEGUO UNA FETCH E MI ASPETTO UN SINGOLO ELEMENTO dI tiPO iMonsters
// // MA SICCOME UN ID NON ESISTE ANCORA E VIENE GENERATO DOPO NON POSSO METTERLO IO
// // QUINDI DEVO PROMETTERGLI UN PARTIAL
// createCard(newCard:Partial<iMonsters>):Promise<iMonsters> {
//   return <Promise<iMonsters>> fetch(this.url, {
//     method: "POST",
//     headers: {
//       "Content-type" : "application/json"
//     },
//     body: JSON.stringify(newCard)
//   }).then(res => {
//     if(!res) {
//       throw new Error("ERRORE NELLA CHIAMATA")
//     } return res.json()}).catch(err => {console.log("ERRORE" + err)})
// }

// // ESEGUO UNA FETCH PER MODIFICARE UNA CARD
// //IN QUESTO CASO L'INDIRIZZO E' URL + CARD.ID COSI MI RESTITUISCE TUTTA LA CARD CHE MI INTERESSA
// editCard(card:iMonsters):Promise<iMonsters> {
//   return <Promise<iMonsters>> fetch(`${this.url}/${card.id}`,{
//     method: "PUT",
//     headers: {
//       "Content-type" : "application/json"
//     },
//     body: JSON.stringify(card)
//   }).then(res => {
//     if(!res) {
//       throw new Error("ERRORE NELLA CHIAMATA")
//     } return res.json()}).catch(err => {console.log("ERRORE" + err)})
// }

// deleteCard(id:number):Promise<iMonsters> {
//   return <Promise<iMonsters>> fetch(`${this.url}/${id}`,{
//     method: "DELETE"
//   }).then(res => {
//     if(!res) {
//       throw new Error("ERRORE NELLA CHIAMATA")
//     } return res.json()}).catch(err => {console.log("ERRORE" + err)})
// }

// getDeck():Promise<iMonsters[]> {
// return <Promise<iMonsters[]>> fetch(this.url).then(res => res.json())
// }

}
