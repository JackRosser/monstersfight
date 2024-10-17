import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { AllcardsService } from '../../services/allcards.service';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss'
})
export class ArenaComponent {

  //ANIMAZIONE DI COMBATTIMENTO
  battleAnimationPlayer: string = "none";
  toggleAnimation: boolean = false;

  battle(event: {animation:string, toggle:boolean}) {

    this.battleAnimationPlayer = "none";
    this.toggleAnimation = event.toggle

  setTimeout(() => {
      if (this.toggleAnimation) {
        this.battleAnimationPlayer = event.animation
        this.toggleAnimation = !this.toggleAnimation;
      }
    }, 10);
  }

}
