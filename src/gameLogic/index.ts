import { User } from "./users";
import { Lobby, lobbies } from "./lobby";
import fetchTriviaQuestions, { TriviaQuestion } from "./trivia";

export interface GameData {
  time: number;
  currentQuestion: TriviaQuestion;
  questions: TriviaQuestion[];
}
export interface Player extends User {
  points: number;
  life: number;
  color: string;
  avatar: string;
}
const startGame = async (lobbyId: string): Promise<Lobby | undefined> => {
  let newLobby = lobbies.find((lobby: Lobby) => lobby.id === lobbyId);

  if (newLobby) {
    const { questions, category } = newLobby.config;
    let trivia: TriviaQuestion[] = await fetchTriviaQuestions(
      questions,
      category
    );
    newLobby.game = { time: 0, currentQuestion: trivia[0], questions: trivia };
  }
  return newLobby;
};
export { startGame };
