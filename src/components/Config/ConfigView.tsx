import { GameConfig } from "@/gameLogic/lobby";

export const ConfigView = ({
  config,
  onChange,
  isHost,
}: {
  config: GameConfig;
  onChange: any;
  isHost: boolean;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newConfig = { ...config, [name]: value };

    onChange(newConfig);
  };
  if (isHost) {
    return (
      <div>
        <label>
          Mode:
          <input
            type="text"
            name="mode"
            value={config.mode}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Questions:
          <input
            type="number"
            name="questions"
            value={config.questions}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Category:
          <input
            type="number"
            name="category"
            value={config.category}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Time:
          <input
            type="number"
            name="time"
            value={config.time}
            onChange={handleInputChange}
          />
        </label>
      </div>
    );
  } else {
    return (
      <div>
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
          <span>{config.category}</span>
        </label>

        <label>
          Time:
          <span>{config.time}</span>
        </label>
      </div>
    );
  }
};
