import { iMonsters } from './../models/i-monsters';
export class Monster implements iMonsters {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public description: string,
    public principale: string,
    public minore: string,
    public barraHp: number,
    public barraStamina: number,
    public hp: number,
    public atk: number,
    public def: number,
    public speed: number,
    public stamina: number,
    public img: string,
    public icon: string,
    public locked: boolean,
    public indeck: boolean,
    public sfondo: string,
    public debolezza: string,
    public forza: string) {}
 }
