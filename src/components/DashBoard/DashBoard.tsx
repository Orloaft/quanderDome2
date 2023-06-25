import { useUserContext } from "@/hooks/useUserContext";
import styles from "./DashBoard.module.scss";

export const DashBoard = ({ signOut }: { signOut: () => void }) => {
  const { user } = useUserContext();
  return (
    <div className={styles.dashboardContainer}>
      <p>Welcome {user?.name}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
