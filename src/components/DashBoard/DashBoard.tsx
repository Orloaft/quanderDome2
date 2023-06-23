import { useUserContext } from "@/hooks/useUserContext";

export const DashBoard = ({ signOut }: { signOut: () => void }) => {
  const { user } = useUserContext();
  return (
    <div>
      <p>welcome {user?.name}</p>

      <button onClick={signOut}>sign out</button>
    </div>
  );
};
