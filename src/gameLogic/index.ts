import { User } from "./users";
import { Lobby, lobbies } from "./lobby";
import fetchTriviaQuestions, { TriviaQuestion } from "./trivia";

export interface GameData {
  round: number;
  time: number;
  currentQuestion: TriviaQuestion;
  questions: TriviaQuestion[];
  countDown: number;
  isConcluded: boolean;
}
export interface Player extends User {
  points: number;
  life: number;
  choices: string[];
}
const checkAnswers = (lobby: Lobby) => {
  let updatedLobby = lobby;
  updatedLobby.users.forEach((player: Player) => {
    if (
      player.choices[0] === updatedLobby.game?.currentQuestion.correctAnswer
    ) {
      player.points += 50;
    }
    player.choices = [];
  });
};
const startRoundTimer = (lobby: Lobby, io: any) => {
  let updatedLobby = lobby;
  let roundTime = lobby.config.time;
  const interval = setInterval(() => {
    roundTime--;

    if (roundTime === 0) {
      clearInterval(interval);
      if (lobby.game) {
        checkAnswers(lobby);

        lobby.game.round++;
        if (lobby.game.round === lobby.game.questions.length) {
          lobby.game.isConcluded = true;
          io.to(lobby.id).emit("update_lobby_res", lobby);
          startCountDown(lobby, io);
        } else {
          lobby.game.currentQuestion = lobby.game.questions[lobby.game.round];
          lobby.game.countDown = 5;
          lobby.chat.push({
            userName: `Round`,
            message: `${lobby.game.round + 1}`,
          });
          io.to(lobby.id).emit("update_lobby_res", lobby);
          startCountDown(lobby, io);
        }
      }
    } else if (roundTime < 10) {
      lobby.chat.push({ userName: `${roundTime}`, message: `seconds left` });
      io.to(lobby.id).emit("update_lobby_res", lobby);
    }
  }, 1000);
};
const startCountDown = (lobby: Lobby, io: any) => {
  const interval = setInterval(() => {
    lobby.game && lobby.game.countDown--;
    io.to(lobby.id).emit("update_lobby_res", lobby);
    if (lobby.game?.countDown === 0) {
      clearInterval(interval);
      startRoundTimer(lobby, io);
    }
  }, 1000);
};
const startGame = async (
  lobbyId: string,
  io: any
): Promise<Lobby | undefined> => {
  let newLobby = lobbies.find((lobby: Lobby) => lobby.id === lobbyId);

  if (newLobby) {
    const { questions, category } = newLobby.config;
    let trivia: TriviaQuestion[] = await fetchTriviaQuestions(
      questions,
      category
    );
    newLobby.game = {
      round: 0,
      time: 0,
      currentQuestion: trivia[0],
      questions: trivia,
      countDown: 5,
      isConcluded: false,
    };
    startCountDown(newLobby, io);
  }
  return newLobby;
};
const submitAnswer = (lobbyId: string, userId: string, answer: string) => {
  let updatedLobby = lobbies.find((lobby: Lobby) => lobby.id === lobbyId);
  if (updatedLobby) {
    let user = updatedLobby.users.find((u: Player) => u.id === userId);
    if (user) {
      user.choices.push(answer);
    }
  }
  return updatedLobby;
};
export { startGame, submitAnswer };
