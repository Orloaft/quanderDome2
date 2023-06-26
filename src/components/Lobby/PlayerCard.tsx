import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
import ReadyBox from "./ReadyBox";
export const PlayerCard = ({
  player,
  updatePlayer,
}: {
  player: Player;
  updatePlayer: (e: any) => void;
}) => {
  return (
    <>
      {" "}
      <Image width={30} height={30} src={player.avatar} alt="Selected Image" />
      <div className={styles.readyBox}>
        <ReadyBox toggleReady={updatePlayer} isReady={player.isReady} />
      </div>
    </>
  );
};
