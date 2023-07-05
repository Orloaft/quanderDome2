import { GameData, submitAnswer } from "@/gameLogic";
import TriviaBox from "../Trivia/TriviaView";
import styles from "./styles.module.scss";
export const GameView = ({
  game,
  submitAnswer,
}: {
  game: GameData;
  submitAnswer: any;
}) => {
  return (
    <div style={{ position: "relative", height: "100%", width: "90%" }}>
      {game.countDown > 0 && (
        <div className={styles.countDown}>
          <span className={styles.number}>{game.countDown}</span>
        </div>
      )}

      <TriviaBox
        style={{ width: "30rem", opacity: `${game.countDown ? `0` : `1`}` }}
        question={game.currentQuestion}
        submitAnswer={submitAnswer}
      />
    </div>
  );
};
