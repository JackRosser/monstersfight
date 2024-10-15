import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

openCloseToggle: boolean = false
deckImg: string = "services/icons/deck_close.png"
modalOpen: string = "absolute w-full h-1/2 z-50 bottom-0 lg:end-0 lg:h-full lg:w-1/2 xl:w-2/3 overflow-auto bg-black"
modalClose: string = "hidden absolute w-full h-1/2 z-50 bottom-0 lg:end-0 lg:h-full lg:w-1/2 xl:w-2/3 overflow-auto bg-black"
deckModal: string = this.modalClose

toggleChange(par: boolean) {
if(par) {
  this.deckImg = "services/icons/deck_open.png"
  this.deckModal = this.modalOpen
} else {
  this.deckImg = "services/icons/deck_close.png"
  this.deckModal = this.modalClose
}

}

}

