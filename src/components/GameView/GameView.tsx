import { GameData, submitAnswer } from "@/gameLogic";
import TriviaBox from "../Trivia/TriviaView";
import styles from "./styles.module.scss";
import { MarathonConfig } from "../Config/MarathonConfig";
import { GameConfig } from "@/gameLogic/lobby";
export const GameView = ({
  game,
  submitAnswer,
  config,
  onChange,
  isOwner,
  endGame,
  nextTrivia,
}: {
  game: GameData;
  config: GameConfig;
  submitAnswer: any;
  onChange: any;
  isOwner: boolean;
  endGame: any;
  nextTrivia: any;
}) => {
  return (
    <div style={{ position: "relative", height: "100%", width: "90%" }}>
      {game.countDown > 0 && (
        <div className={styles.countDown}>
          <span className={styles.number}>{game.countDown}</span>
        </div>
      )}
      {(game.currentQuestion.question && (
        <TriviaBox
          style={{ width: "30rem", opacity: `${game.countDown ? `0` : `1`}` }}
          question={game.currentQuestion}
          submitAnswer={submitAnswer}
        />
      )) || (
        <MarathonConfig
          nextTrivia={nextTrivia}
          endGame={endGame}
          isOwner={isOwner}
          config={config}
          onChange={onChange}
        />
      )}
    </div>
  );
};
