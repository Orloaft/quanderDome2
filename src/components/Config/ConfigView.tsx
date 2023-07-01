import { GameConfig, GameMode, updateConfig } from "@/gameLogic/lobby";
import { CategorySelect } from "./CategorySelect";
import { options } from "@/utils/categories";
import { memo } from "react";
import styles from "./styles.module.scss";

export const ConfigView = memo(function ConfigView({
  config,
  onChange,
  isHost,
}: {
  config: GameConfig;
  onChange: any;
  isHost: boolean;
}) {
  const selectedCategory = options.find(
    (option) => option.id === +config.category
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value, checked } = event.target;

    const newConfig = {
      ...config,
      [name]: event.target.type === "checkbox" ? checked : value,
    };
    console.log(name, value, checked);
    onChange(newConfig);
  };

  if (isHost) {
    return (
      <div className={styles.configViewContainer}>
        <label>
          Mode:
          <select
            name="mode"
            defaultValue={config.mode}
            onChange={handleInputChange}
          >
            {Object.values(GameMode).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <label>
            <span>Teams:</span>
            <input
              name="teams"
              onChange={(e) => {
                handleInputChange(e);
              }}
              type="checkbox"
              checked={config.teams}
            ></input>
          </label>
        </label>

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
          Category:
          <CategorySelect
            handleInputChange={handleInputChange}
            category={config.category}
          />
        </label>

        <label>
          Round-Time:
          <input
            type="number"
            name="time"
            defaultValue={config.time}
            onChange={handleInputChange}
          />
        </label>
        {config.mode === GameMode.DEATH_MATCH && (
          <label>
            Life totals:{" "}
            <input
              type="number"
              name="life"
              defaultValue={config.life}
              onChange={handleInputChange}
            />
          </label>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.configViewContainer}>
        <label>
          Mode:
          <span>{config.mode}</span>
          <label>
            <span>Teams:</span>
            {config.teams ? "Yes" : "No"}
          </label>
        </label>

        <label>
          Questions:
          <span>{config.questions}</span>
        </label>

        <label>
          Category:
          <span>{selectedCategory && selectedCategory.name}</span>
        </label>

        <label>
          Time:
          <span>{config.time}</span>
        </label>
      </div>
    );
  }
});
