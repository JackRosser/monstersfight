import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-selectattribute',
  templateUrl: './selectattribute.component.html',
  styleUrl: './selectattribute.component.scss'
})
export class SelectattributeComponent {

icons: string[] = ["services/icons/acqua.webp", "services/icons/fuoco.webp", "services/icons/vento.webp", "services/icons/terra.webp", "services/icons/erba.webp", "services/icons/legendary.webp"]
iconClass: string = "max-h-[4rem] rounded-full cursor-pointer hover:scale-110 hover:rotate-[20deg] transition-transform duration-[300ms] active:scale-50"

// QUI IMPORTO L'ARRAY DEI MOSTRI
@Input() monstersList!: iMonsters[]
// QUI ESPORTO L'ARRAY MODIFICATO
@Output() selectedAttribute = new EventEmitter<string>

// QUI CREO UNA FUNZIONE CHE POI ESPORTA IL DATO
elementoCorrente!:string
modifyMonstersList(elemento:string) {
  this.elementoCorrente = elemento
  this.selectedAttribute.emit(this.elementoCorrente)

}



}
