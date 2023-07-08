import { GameData, submitAnswer } from "@/gameLogic";
import TriviaBox from "../Trivia/TriviaView";
import styles from "./styles.module.scss";
import { MarathonConfig } from "../Config/MarathonConfig";
import { GameConfig } from "@/gameLogic/lobby";
import Confetti from "react-confetti";
import { Scores } from "./Scores";
import { setLobbyData, setUserData } from "@/actions";
import { store } from "@/store";
import ChatBox from "../Chat/Chat";

export const GameView = ({
  game,
  submitAnswer,
  config,
  onChange,
  isOwner,
  endGame,
  nextTrivia,
  socket,
}: {
  game: GameData;
  config: GameConfig;
  submitAnswer: any;
  onChange: any;
  isOwner: boolean;
  endGame: any;
  nextTrivia: any;
  socket: any;
}) => {
  return (
    <div className={styles.gameContainer}>
      {(game.isConcluded && (
        <>
          <Confetti height={1000} width={3000} tweenDuration={5000} />
          <div className={styles.conclusionBox}>
            <span style={{ textAlign: "center", fontSize: "2rem" }}>
              GAME OVER!
            </span>
            <Scores style={{ bottom: "-20vh" }} />
            <button
              onClick={() => {
                store.dispatch(setLobbyData(null));
                store.dispatch(setUserData(null));
              }}
            >
              Leave
            </button>{" "}
          </div>
        </>
      )) ||
        (game.countDown > 0 && (
          <div className={styles.countDown}>
            <span className={styles.number}>{game.countDown}</span>
          </div>
        ))}
      {(game.currentQuestion.question && (
        <TriviaBox
          style={{ width: "30rem", opacity: `${game.countDown ? `0` : `1`}` }}
          question={game.currentQuestion}
          submitAnswer={submitAnswer}
        />
      )) ||
        (!game.isConcluded && (
          <MarathonConfig
            nextTrivia={nextTrivia}
            endGame={endGame}
            isOwner={isOwner}
            config={config}
            onChange={onChange}
          />
        ))}
      <div
        className="frame"
        style={{ width: "fit-content", fontSize: "1.25rem" }}
      >
        {" "}
        <ChatBox socket={socket} />
      </div>
      {!game.isConcluded && <Scores />}
    </div>
  );
};
