import { User } from "./users";

export interface GameData {
  time: number;
  players: Player[];
}
export interface Player extends User {
  points: number;
  life: number;
  color: string;
  avatar: string;
}
