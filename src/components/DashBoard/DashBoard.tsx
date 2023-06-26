import { useUserContext } from "@/hooks/useUserContext";
import styles from "./DashBoard.module.scss";
import PlayerView from "../Lobby/PlayerView";

export const DashBoard = ({
  signOut,
  updatePlayer,
}: {
  signOut: () => void;
  updatePlayer: any;
}) => {
  const { user } = useUserContext();
  return (
    user && (
      <div className={styles.dashboardContainer}>
        <PlayerView player={user} updatePlayer={updatePlayer} />

        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  );
};
