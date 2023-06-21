import { useUserContext } from "@/hooks/useUserContext";

export const DashBoard = () => {
  const { user } = useUserContext();
  return (
    <div>
      <p>{user?.id}</p>
      <p>{user?.name}</p>
      <p>{user?.socketId}</p>
    </div>
  );
};
