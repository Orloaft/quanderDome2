import { useUserContext } from "@/hooks/useUserContext";

export const DashBoard = ({ signOut }: { signOut: () => void }) => {
  const { user } = useUserContext();
  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.id}</p>
      <button onClick={signOut}>sign out</button>
    </div>
  );
};
