import { GameConfig, GameMode } from "@/gameLogic/lobby";
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newConfig = { ...config, [name]: value };

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
        </label>

        <label>
          Questions:
          <input
            type="number"
            name="questions"
            defaultValue={config.questions}
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
          Time:
          <input
            type="number"
            name="time"
            defaultValue={config.time}
            onChange={handleInputChange}
          />
        </label>
      </div>
    );
  } else {
    return (
      <div className={styles.configViewContainer}>
        <label>
          Mode:
          <span>{config.mode}</span>
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
