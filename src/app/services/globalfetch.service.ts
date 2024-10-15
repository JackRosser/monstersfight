import { Injectable } from '@angular/core';
import { iMonsters } from '../models/i-monsters';

@Injectable({
  providedIn: 'root'
})
export class GlobalfetchService {

  constructor() { }

url:string = "http://localhost:3000/monsters"

// ESEGUO UNA FETCH E MI ASPETTO UN ARRAY CON DENTRO OGGETTI DI TIPO iMonsters, quindi iMonsters[]
getAllMonsters(){
  return <Promise<iMonsters[]>> fetch(this.url).then(res => res.json())
}
// ESEGUO UNA FETCH E MI ASPETTO UN SINGOLO ELEMENTO DI TIPO iMonsters, quindi iMonsters
getSingleMonster(id:number){
  return <Promise<iMonsters>> fetch(`${this.url}/${id}`).then(res => res.json())
}

createCard() {
  return <Promise<iMonsters[]>> fetch(this.url).then()
}

}
