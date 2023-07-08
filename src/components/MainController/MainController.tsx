import { useCallback, useEffect, useState } from "react";
import SignInView from "../SignIn/SignIn";
import useSocket from "@/hooks/useSocket";
import handleSocketEvents, { tearDownSocketEvents } from "./socketHandlers";
import DashBoard from "../DashBoard/DashBoard";
import { LobbyList } from "../LobbyList/LobbyList";
import { GameConfig } from "@/gameLogic/lobby";
import { LobbyView } from "../Lobby/Lobby";
import { GameView } from "../GameView/GameView";
import { connect } from "react-redux";
import { setUserData } from "@/actions";
import styles from "./styles.module.scss";
import Confetti from "react-confetti";
const MainController = ({ lobby, user }: { lobby: any; user: any }) => {
  const [socket, socketInitializer] = useSocket();
  const [isConnected, setIsConnected] = useState(false);
  const signIn = (name: string) => {
    socket?.emit("add_user", name);
  };
  const leaveLobby = (id: string) =>
    user &&
    socket?.emit("leave_lobby", id === "self" ? user.id : id, socket.id);

  const updateConfig = (config: GameConfig) => {
    lobby && socket?.emit("update_config", lobby.id, config);
  };
  const startGame = () => {
    lobby && socket?.emit("start_game", lobby.id);
  };
  const endGame = () => {
    lobby && socket?.emit("end_game", lobby.id);
  };
  const nextTrivia = () => {
    lobby && socket?.emit("next_trivia", lobby.id);
  };
  const submitAnswer = useCallback(
    (answer: string) => {
      lobby && user && socket?.emit("submit_answer", lobby.id, user.id, answer);
    },
    [lobby, socket, user]
  );

  const updatePlayer = (e: any) => {
    if (lobby) {
      user && socket?.emit("update_player", user.id, lobby.id, e);
    } else {
      user && socket?.emit("update_user", user.id, e);
    }
  };

  const signOut = () => {
    user && socket?.emit("remove_user", user.id);
    sessionStorage.removeItem("userId");
    setUserData(null);
  };
  const handleSocketInitialization = useCallback(async () => {
    let socket = await socketInitializer();
    if (socket) {
      setIsConnected(true);
    }
  }, [socketInitializer]);
  useEffect(() => {
    if (socket) {
      handleSocketEvents(socket);
      let userId = sessionStorage.getItem("userId");
      if (!user && userId) {
        socket.emit("reconnect_user", userId);
      }
    } else {
      handleSocketInitialization();
    }
    return () => {
      socket && tearDownSocketEvents(socket);
    };
  }, [socket, handleSocketInitialization, user]);
  if (lobby) {
    if (lobby.game) {
      return (
        <>
          {lobby.game.isConcluded && (
            <Confetti height={1000} width={3000} tweenDuration={5000} />
          )}
          <GameView
            game={lobby.game}
            config={lobby.config}
            submitAnswer={submitAnswer}
            onChange={updateConfig}
            isOwner={user.id === lobby.hostId}
            nextTrivia={nextTrivia}
            endGame={endGame}
            socket={socket}
            leaveLobby={leaveLobby}
          />
        </>
      );
    } else {
      return (
        <LobbyView
          userId={user.id}
          lobby={lobby}
          onConfigChange={updateConfig}
          leaveLobby={leaveLobby}
          socket={socket}
          updatePlayer={updatePlayer}
          startGame={startGame}
        />
      );
    }
  } else if (socket && user) {
    return (
      <div className={styles.container}>
        <DashBoard signOut={signOut} updatePlayer={updatePlayer} />
        <LobbyList socket={socket} />
      </div>
    );
  } else if (isConnected) {
    return <SignInView socket={socket} handleSubmit={signIn} />;
  } else {
    return <span>Connecting...</span>;
  }
};
const mapStateToProps = (state: any) => ({
  user: state.user.userData,
  lobby: state.lobby.lobbyData,
});

export default connect(mapStateToProps)(MainController);
