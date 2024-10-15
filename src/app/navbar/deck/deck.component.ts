import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {

@Input() deckImg!: string
@Input() openCloseToggle!: boolean
@Output() toggleChange = new EventEmitter<boolean>()

changeToggle() {
this.openCloseToggle = !this.openCloseToggle

  this.toggleChange.emit(this.openCloseToggle)
}

}
