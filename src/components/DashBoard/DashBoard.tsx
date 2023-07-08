import styles from "./DashBoard.module.scss";
import PlayerView from "../Lobby/PlayerView";
import { UserState } from "@/actions/types";
import { connect, useSelector } from "react-redux";

const DashBoard = ({
  signOut,
  updatePlayer,
}: {
  signOut: () => void;
  updatePlayer: any;
}) => {
  const user = useSelector((state: any) => state.user.userData);
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

export default DashBoard;
