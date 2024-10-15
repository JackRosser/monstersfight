import { iMonsters } from './../../models/i-monsters';
import { GlobalfetchService } from './../../services/globalfetch.service';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-deckmodal',
  templateUrl: './deckmodal.component.html',
  styleUrl: './deckmodal.component.scss'
})
export class DeckmodalComponent {



@Input() deckModal!: string

deck!: iMonsters[]



}
