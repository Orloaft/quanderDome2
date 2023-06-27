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
      <div>
        <div className={styles.dashboardContainer}>
          <PlayerView player={user} updatePlayer={updatePlayer} />
        </div>
      </div>
    )
  );
};
