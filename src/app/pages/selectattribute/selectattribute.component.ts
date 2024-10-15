import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selectattribute',
  templateUrl: './selectattribute.component.html',
  styleUrl: './selectattribute.component.scss'
})
export class SelectattributeComponent {

icons: string[] = ["services/icons/acqua.webp", "services/icons/fuoco.webp", "services/icons/vento.webp", "services/icons/terra.webp", "services/icons/erba.webp", "services/icons/legendary.webp"]
iconClass: string = "max-h-[4rem] rounded-full cursor-pointer hover:scale-110 hover:rotate-[20deg] transition-transform duration-[300ms] active:scale-50"

@Input() acqua!:boolean
@Input() fuoco!:boolean
@Input() vento!:boolean
@Input() terra!:boolean
@Input() erba!:boolean
@Input() legendary!:boolean

@Output() attributoMostrato = new EventEmitter<{ [key: string]: boolean }>();
@Output() attrEliminUno = new EventEmitter<{ [key: string]: boolean }>();
@Output() attrEliminDue = new EventEmitter<{ [key: string]: boolean }>();
@Output() attrEliminTre = new EventEmitter<{ [key: string]: boolean }>();
@Output() attrEliminQuattro = new EventEmitter<{ [key: string]: boolean }>();
@Output() attrEliminCinque = new EventEmitter<{ [key: string]: boolean }>();

attributeChanger(attributo: string, eliminareUno: string, eliminareDue: string, eliminareTre: string, eliminareQuattro: string, eliminareCinque: string) {

  (this as any)[attributo] = !(this as any)[attributo];


  if ((this as any)[eliminareUno]) {
    (this as any)[eliminareUno] = false;
  }
  if ((this as any)[eliminareDue]) {
    (this as any)[eliminareDue] = false;
  }
  if ((this as any)[eliminareTre]) {
    (this as any)[eliminareTre] = false;
  }
  if ((this as any)[eliminareQuattro]) {
    (this as any)[eliminareQuattro] = false;
  }
  if ((this as any)[eliminareCinque]) {
    (this as any)[eliminareCinque] = false;
  }


  this.attributoMostrato.emit((this as any)[attributo]);
  this.attrEliminUno.emit((this as any)[eliminareUno]);
  this.attrEliminDue.emit((this as any)[eliminareDue]);
  this.attrEliminTre.emit((this as any)[eliminareTre]);
  this.attrEliminQuattro.emit((this as any)[eliminareQuattro]);
  this.attrEliminCinque.emit((this as any)[eliminareCinque]);

}

}
