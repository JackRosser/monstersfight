import { Component } from '@angular/core';
import { BattleService } from '../../services/battle.service';
import { iMonsters } from '../../models/i-monsters';
import { Monster } from '../../classes/monster';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent {


  playerClone!: iMonsters[]
  opponentClone!: iMonsters[]

  playerInGame!:iMonsters
  opponentInGame!:iMonsters

  battleAnimationPlayer: string = 'none';
  battleAnimationOpponent: string = 'none';
  toggleAnimation: boolean = false;
  indexPlayer:number = 0
  indexOpponent:number = 0

  constructor(private battleSvc: BattleService) {}

// FuNZIONE DI ESEMPIO, SE VOGLIO MODIFICARE LA BARRA DEVO MODIFICARE TUTTO L'OGGETTO
test(newHp:number):void {
  this.playerInGame = {...this.playerInGame, barraHp: newHp}
  console.log(this.playerInGame);


}

// FUNZIONI PER QUANDO ENTRA UN NUOVO MOSTRO IN BATTAGLIA

enterNewMonsterPlayer(monster:iMonsters): void {
  this.playerInGame = new Monster(
    monster.id,
    monster.name,
    monster.type,
    monster.description,
    monster.principale,
    monster.minore,
    monster.barraHp,
    monster.barraStamina,
    monster.hp,
    monster.atk,
    monster.def,
    monster.speed,
    monster.stamina,
    monster.img,
    monster.icon,
    monster.locked,
    monster.indeck,
    monster.sfondo,
    monster.debolezza,
    monster.forza
  )
}

enterNewMonsterOpponent(monster:iMonsters): void {
    this.opponentInGame = new Monster(
      monster.id,
      monster.name,
      monster.type,
      monster.description,
      monster.principale,
      monster.minore,
      monster.barraHp,
      monster.barraStamina,
      monster.hp,
      monster.atk,
      monster.def,
      monster.speed,
      monster.stamina,
      monster.img,
      monster.icon,
      monster.locked,
      monster.indeck,
      monster.sfondo,
      monster.debolezza,
      monster.forza
    )
  }

// FUNZIONI PER CAMBIARE LE STATISTICHE DEI MOSTRI PRESENTI

playerMonsterDamaged(monster:iMonsters, damage:number) {
  let clone = this.playerClone[0]
  let inGame = this.playerInGame
  this.playerInGame = new Monster (
    monster.id = clone.id,
    monster.name = clone.name,
    monster.type = clone.type,
    monster.description = clone.description,
    monster.principale = clone.principale,
    monster.minore = clone.minore,
    monster.barraHp = (inGame.hp / clone.hp) * 100,
    monster.barraStamina = (inGame.stamina / clone.stamina) * 100,
    monster.hp = damage,
    monster.atk = clone.atk,
    monster.def = clone.def,
    monster.speed = clone.speed,
    monster.stamina = inGame.stamina - (inGame.stamina * 0.15),
    monster.img = clone.img,
    monster.icon = clone.icon,
    monster.locked = clone.locked,
    monster.indeck = clone.indeck,
    monster.sfondo = clone.sfondo,
    monster.debolezza = clone.debolezza,
    monster.forza = clone.forza
  )

}

opponentMonsterDamaged(monster:iMonsters, damage:number) {
  let clone = this.opponentClone[0]
  let inGame = this.opponentInGame
  this.opponentInGame = new Monster (
    monster.id = clone.id,
    monster.name = clone.name,
    monster.type = clone.type,
    monster.description = clone.description,
    monster.principale = clone.principale,
    monster.minore = clone.minore,
    monster.barraHp = (inGame.hp / clone.hp) * 100,
    monster.barraStamina = (inGame.stamina / clone.stamina) * 100,
    monster.hp = damage,
    monster.atk = clone.atk,
    monster.def = clone.def,
    monster.speed = clone.speed,
    monster.stamina = inGame.stamina - (inGame.stamina * 0.15),
    monster.img = clone.img,
    monster.icon = clone.icon,
    monster.locked = clone.locked,
    monster.indeck = clone.indeck,
    monster.sfondo = clone.sfondo,
    monster.debolezza = clone.debolezza,
    monster.forza = clone.forza
  )

}


// cambiare hp e stamina di ingame

// BATTAGLIA!!!!!!!!
  battle(event: { animation: string, toggle: boolean, damagePlayer: number, damageOpponent: number, staminaPlayer:number, staminaOpponent:number }) {

    //GESTISCO LE ANIMAZIONI___________________________________________________
    this.battleAnimationPlayer = event.animation;
    this.battleAnimationOpponent = 'opponent 500ms ease-in-out'
    this.toggleAnimation = event.toggle;
    setTimeout(() => {
      this.battleAnimationPlayer = 'none';
      this.battleAnimationOpponent = 'none';
      this.toggleAnimation = false;
    }, 500);

// GESTISCO I MORTI

if (this.playerInGame.hp <= 0) {
  let newEntry = this.playerClone.filter(monster => monster.id !== this.playerClone[0].id);

  if (newEntry.length > 0) {
    this.enterNewMonsterPlayer(newEntry[0]);
  } else {
    alert("deck del player esaurito")
  }
}

if (this.opponentInGame.hp <= 0) {
  let newEntry = this.opponentClone.filter(monster => monster.id !== this.opponentClone[0].id);

  if (newEntry.length > 0) {
    this.enterNewMonsterOpponent(newEntry[0]);
  } else {
    alert("deck dell'oppo esaurito")
  }
}

//CALCOLO I DANNI E AGGIORNO LE BARRE

this.playerMonsterDamaged(this.playerInGame, event.damagePlayer)
this.opponentMonsterDamaged(this.opponentInGame, event.damageOpponent)


//FINE FUNZIONE_________________________________________________
  }
//FINE FUNZIONE_________________________________________________


  // INIZIO NGONINIT_______________________________________________________________

  ngOnInit(): void {
    // Sottoscrizione per il deck del player
    this.battleSvc.player$.subscribe(playerDeck => {
      this.playerClone = JSON.parse(JSON.stringify(playerDeck)); // Deep copy del player deck
    if (this.playerClone) {
      this.playerInGame = this.playerClone[this.indexPlayer]
    }
    });

    // Sottoscrizione per il deck dell'opponent
    this.battleSvc.opponent$.subscribe(opponentDeck => {
      this.opponentClone = JSON.parse(JSON.stringify(opponentDeck)); // Deep copy dell'opponent deck
    if(this.opponentClone) {
      this.opponentInGame = this.opponentClone[this.indexOpponent]
    }
    });
  }


}
