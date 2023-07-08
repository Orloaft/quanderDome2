import { GameConfig } from "@/gameLogic/lobby";
import { CategorySelect } from "./CategorySelect";
import styles from "./styles.module.scss";
export const MarathonConfig = ({
  config,
  onChange,
  isOwner,
  endGame,
  nextTrivia,
}: {
  config: GameConfig;
  onChange: any;
  isOwner: boolean;
  endGame: any;
  nextTrivia: any;
}) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value, checked } = event.target;

    const newConfig = {
      ...config,
      [name]: event.target.type === "checkbox" ? checked : value,
    };
    onChange(newConfig);
  };
  return (
    <div
      className={`frame ${styles.marathon}`}
      style={{ width: "fit-content" }}
    >
      {(isOwner && (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              Questions:
              <input
                type="number"
                name="questions"
                defaultValue={config.questions}
                max={30}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Category
              <CategorySelect
                handleInputChange={handleInputChange}
                category={0}
              />
            </label>
            <button onClick={nextTrivia}>Continue</button>
            <button onClick={endGame}>End game</button>
          </div>
        </>
      )) || (
        <>
          <label>
            Questions:
            <span>{config.questions}</span>
            <label>
              Category
              <span>{config.category}</span>
            </label>
          </label>
        </>
      )}{" "}
    </div>
  );
};
