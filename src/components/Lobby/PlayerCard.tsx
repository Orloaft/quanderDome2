import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
import ReadyBox from "./ReadyBox";
import { TeamSelect } from "./TeamSelect";
import { useSelector } from "react-redux";
export const PlayerCard = ({
  player,
  updatePlayer,
  teams,
}: {
  player: Player;
  updatePlayer: (e: any) => void;
  teams: boolean;
}) => {
  const user = useSelector((state: any) => state.user.userData);

  return (
    <div className="frame">
      {" "}
      <div
        style={{
          border: `4px solid ${player.color}`,
          padding: 0,
          borderRadius: "4px",
          width: "fit-content",
        }}
      >
        <Image
          width={100}
          height={100}
          src={player.avatar}
          alt="Selected Image"
        />
      </div>
      {(user && player.id === user.id && (
        <div className={styles.readyBox}>
          <ReadyBox toggleReady={updatePlayer} isReady={player.isReady} />
          {teams && player.team && (
            <>
              {" "}
              <TeamSelect toggleTeam={updatePlayer} team={player.team} />{" "}
              <span>Team {player.team}</span>
            </>
          )}
        </div>
      )) ||
        (player.isReady && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {teams && <span>Team {player.team}</span>}
            <span>READY</span>
          </div>
        ))}
    </div>
  );
};
