// QUA INIZIANO I CALCOLI PER I DANNI DEL PLAYER

// AVVERSARIO LEGGENDARIO: Aumento fisso per attacco e difesa
if (this.opponentMonster.forza === "tutto") {
  this.opponentMonster.atk += this.opponentMonster.atk * 0.2; // Aumento del 20% di attacco
  this.opponentMonster.def += this.opponentMonster.def * 0.2; // Aumento del 20% di difesa
}

// AVVERSARIO FORTE CONTRO DI ME E PIÙ VELOCE: Aumento ulteriore
if (this.playerMonster.debolezza === this.opponentMonster.forza && this.playerMonster.speed < this.opponentMonster.speed) {
  this.opponentMonster.atk *= 1.5 * 1.2; // Aumento del 150% seguito dal 20% in più
}

// AVVERSARIO PIÙ VELOCE DI ME: Aumento ulteriore, se non già incrementato
if (this.playerMonster.speed < this.opponentMonster.speed && !(this.playerMonster.debolezza === this.opponentMonster.forza)) {
  this.opponentMonster.atk += this.opponentMonster.atk * 0.2; // Aumento del 20%
}

// DANNO BASE: Calcolo del danno inflitto al giocatore
const damageToPlayer = this.opponentMonster.atk - (this.playerMonster.def * 0.15);
this.damagePlayer = this.playerMonster.hp -= damageToPlayer;


// QUA INIZIANO I CALCOLI PER I DANNI DELL'OPPO

// IO SONO LEGGENDARIO: Aumento fisso per attacco e difesa
if (this.playerMonster.forza === "tutto") {
  this.playerMonster.atk += this.playerMonster.atk * 0.2; // Aumento del 20% di attacco
  this.playerMonster.def += this.playerMonster.def * 0.2; // Aumento del 20% di difesa
}

// IO SONO PIÙ FORTE E PIÙ VELOCE: Aumento ulteriore
if (this.opponentMonster.debolezza === this.playerMonster.forza && this.opponentMonster.speed < this.playerMonster.speed) {
  this.playerMonster.atk *= 1.5 * 1.2; // Aumento del 150% seguito dal 20% in più
}

// IO SONO PIÙ VELOCE: Aumento ulteriore, se non già incrementato
if (this.opponentMonster.speed < this.playerMonster.speed && !(this.opponentMonster.debolezza === this.playerMonster.forza)) {
  this.playerMonster.atk += this.playerMonster.atk * 0.2; // Aumento del 20%
}

// DANNO BASE: Calcolo del danno inflitto all'avversario
const damageToOpponent = this.playerMonster.atk - (this.opponentMonster.def * 0.15);
this.damageOpponent = this.opponentMonster.hp -= damageToOpponent;



