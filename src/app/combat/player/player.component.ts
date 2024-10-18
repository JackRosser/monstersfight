import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { iMonsters } from '../../models/i-monsters';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  // Mostro attivo e background
  monsterActive!: iMonsters;
  background: string = '';


  @Input() battleAnimationPlayer!: string;
  @Input() toggleAnimation!: boolean;
  @Input() playerCard: iMonsters[] = [];
  @Input() monsterInCombat!: iMonsters;
  @Input() playerHp!: string;      // Riceve la stringa per la percentuale di HP
  @Input() playerStamina!: string; // Riceve la stringa per la percentuale di Stamina

  // Output per emettere eventi di animazione di battaglia
  @Output() battleAnimationEmit = new EventEmitter<{ animation: string, toggle: boolean }>();

  // Funzione che emette l'evento per l'animazione
  battleOutput() {
    this.battleAnimationPlayer = 'battle 500ms ease-in-out';
    this.toggleAnimation = true;
    this.battleAnimationEmit.emit({
      animation: this.battleAnimationPlayer,
      toggle: this.toggleAnimation
    });
  }

  // Gestione delle modifiche degli Input
  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerCard'] && this.playerCard.length > 0) {
      this.monsterActive = this.playerCard[0];
      this.background = `url(${this.monsterActive.sfondo})`;
    }
    console.log(this.playerHp);

  }
}
