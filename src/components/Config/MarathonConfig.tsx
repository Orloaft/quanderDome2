import { GameConfig } from "@/gameLogic/lobby";
import { CategorySelect } from "./CategorySelect";

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
    <div className="frame">
      {(isOwner && (
        <>
          <label>
            Questions:
            <input
              type="number"
              name="questions"
              defaultValue={config.questions}
              max={30}
              onChange={handleInputChange}
            />
            <label>
              Category
              <CategorySelect
                handleInputChange={handleInputChange}
                category={0}
              />
            </label>
            <button onClick={nextTrivia}>Continue</button>
            <button onClick={endGame}>End game</button>
          </label>
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
