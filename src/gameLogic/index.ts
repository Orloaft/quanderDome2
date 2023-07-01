import { User } from "./users";
import { GameMode, Lobby, closeLobby, lobbies } from "./lobby";
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
  team: number;
}
const checkAnswers = (lobby: Lobby) => {
  let updatedLobby = lobby;
  switch (updatedLobby.config.mode) {
    case GameMode.NORMAL:
      updatedLobby.users.forEach((player: Player) => {
        let index = player.choices.findIndex(
          (choice) =>
            choice === updatedLobby.game?.currentQuestion.correctAnswer
        );
        if (index !== -1) {
          player.points += 50 - index * 15;
        }
        player.choices = [];
      });
      break;
    case GameMode.DEATH_MATCH:
      updatedLobby.users.forEach((player: Player) => {
        let index = player.choices.findIndex(
          (choice) =>
            choice === updatedLobby.game?.currentQuestion.correctAnswer
        );
        if (index !== -1) {
          player.life += 5 - index * 15;
        } else {
          player.life -= 40;
        }
        player.life < 0 && (player.life = 0);
        player.choices = [];
      });
      if (!updatedLobby.users.find((user) => user.life > 0)) {
        updatedLobby.game &&
          (updatedLobby.game.round = updatedLobby.config.questions);
      }
      break;
  }
};
const startRoundTimer = (lobby: Lobby, io: any) => {
  let updatedLobby = lobby;
  let roundTime = lobby.config.time;
  const interval = setInterval(() => {
    roundTime--;

    if (roundTime === 0) {
      clearInterval(interval);
      if (updatedLobby.game) {
        checkAnswers(updatedLobby);
        console.log(updatedLobby.game.questions);
        updatedLobby.game.round++;
        if (updatedLobby.game.round === updatedLobby.game.questions.length) {
          updatedLobby.game.isConcluded = true;
          io.to(lobby.id).emit("update_lobby_res", updatedLobby);
          closeLobby(lobby.id);
        } else {
          updatedLobby.game.currentQuestion =
            updatedLobby.game.questions[updatedLobby.game.round];
          updatedLobby.game.countDown = 5;
          updatedLobby.chat.push({
            userName: `Round`,
            message: `${updatedLobby.game.round + 1}`,
          });
          console.log(updatedLobby.game.round);
          io.to(lobby.id).emit("update_lobby_res", updatedLobby);
          startCountDown(updatedLobby, io);
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
    newLobby.public = false;
    if (newLobby.config.mode === GameMode.DEATH_MATCH) {
      newLobby.users.forEach((user) => {
        newLobby && (user.life = newLobby.config.life);
      });
    }
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
