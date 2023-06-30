import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
import ReadyBox from "./ReadyBox";
import { useUserContext } from "@/hooks/useUserContext";
export const PlayerCard = ({
  player,
  updatePlayer,
}: {
  player: Player;
  updatePlayer: (e: any) => void;
}) => {
  const user = useUserContext().user;

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
          width={30}
          height={30}
          src={player.avatar}
          alt="Selected Image"
        />
      </div>
      {(user && player.id === user.id && (
        <div className={styles.readyBox}>
          <ReadyBox toggleReady={updatePlayer} isReady={player.isReady} />
        </div>
      )) ||
        (player.isReady && <p>READY</p>)}
    </div>
  );
};
